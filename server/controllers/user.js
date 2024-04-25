import jwt from "jsonwebtoken";
import User from "../models/User.js";

import Menu from "../models/Menu.js";
import multer from "multer";
import path from "path";
import fs from 'fs';
import dotenv from "dotenv";
import axios from 'axios';


dotenv.config();
import { ocrSpace } from 'ocr-space-api-wrapper';



const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: "Bad request. Please add email and password in the request body",
    });
  }

  let foundUser = await User.findOne({ email: req.body.email });
  if (foundUser) {
    const isMatch = await foundUser.comparePassword(password);

    if (isMatch) {
      const token = jwt.sign(
        {
          id: foundUser._id,
          name: foundUser.name,
          email: foundUser.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );

      return res.status(200).json({ msg: "user logged in", token });
    } else {
      return res.status(400).json({ msg: "Bad password" });
    }
  } else {
    return res.status(400).json({ msg: "Bad credentials" });
  }
};

const dashboard = async (req, res) => {
  const menus = await Menu.find({ m_user: req.user.email });
  res.status(200).json(menus);
};




const getAllUsers = async (req, res) => {
  let users = await User.find({});

  return res.status(200).json({ users });
};

const register = async (req, res) => {
  let foundUser = await User.findOne({ email: req.body.email });
  if (foundUser === null) {
    let { username, email, password} = req.body;
    if (username.length && email.length && password.length) {
      const person = new User({
        name: username,
        email: email,
        password: password,
      });
      await person.save();
      return res.status(201).json({ person });
    } else {
      return res
        .status(400)
        .json({ msg: "Please add all values in the request body" });
    }
  } else {
    return res.status(400).json({ msg: "Email already in use" });
  }
};

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./documents/"); // Destination folder for storing uploaded files
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    ); // Rename uploaded file
  },
});

const parseText = (text) => {
  // Remove dollar signs and trim the text
  const cleanedText = text.replace(/\$/g, '').trim();
  const lines = cleanedText.split('\n');

  // Initialize the parsed data
  let category = '';
  const items = [];
  const prices = [];

  // Parsing the lines
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // If the line is empty, skip it
    if (!line) {
      continue;
    }

    // Check if the line contains a number (price)
    const lineContainsPrice = /\d/.test(line);
    const lineEndsWithPrice = /(\d+|\d+\/\d+)$/;

    if (lineContainsPrice && lineEndsWithPrice.test(line)) {
      // If the line contains a number and ends with a price, extract the price
      const parts = line.split(/(\d+|\d+\/\d+)$/);
      const name = parts[0].trim();
      const price = parts[1].trim();

      // Add the item and price to their respective arrays
      items.push({ name });
      prices.push(price);
    } else {
      // Otherwise, treat it as a category or item name
      // Check if the line starts with a price, add it to the prices list
      const priceMatch = line.match(/^(\d+|\d+\/\d+)$/);
      if (priceMatch) {
        prices.push(priceMatch[0].trim());
      } else {
        // If no prices detected, consider it part of the category or item name
        if (!category) {
          category = line; // Assign as category if it hasn't been set yet
        } else {
          // Add to the items list if it's not a price or category
          items.push({ name: line });
        }
      }
    }
  }

  // Ensure the number of items and prices match
  items.forEach((item, index) => {
    if (prices[index]) {
      item.price = prices[index];
    }
  });

  return {
    category,
    items
  };
};




const addItem = async (req, res) => {
  try {
    const { name, language } = req.body;
    const { email } = req.user;
    const octAPI = process.env.OCR_API;


    // Check if a file is uploaded
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
    // Get the original filename of the uploaded file
    const originalFilename = req.file.originalname;

    // Extract the file extension
    const fileExtension = path.extname(originalFilename);



    // Load the image file
  
    const filePath = path.join('documents', email, `img${fileExtension}`);

    const imageBuffer = fs.readFileSync(filePath);

    // Convert image buffer to base64
    const base64Image = imageBuffer.toString('base64');

    // Construct base64 image string with MIME type prefix
    const base64ImageString = `data:image/jpeg;base64,${base64Image}`;

    // OCR.Space API URL


    // OCR.Space API request parameters
    const response = await ocrSpace( base64ImageString , { apiKey: process.env.OCR_API, language: `${language}` });




    const parsedText = response?.ParsedResults?.[0]?.ParsedText;
    console.log(parsedText);

 
  
    // Parse the text to extract categories and items
    const { category, items } = parseText(parsedText);

    // Create a new Menu item
    const menu = new Menu({
      name,
      m_user: email,
      image: 'https://i.postimg.cc/B6DGTRqN/menu.jpg',
      menu: [
        {
          category, // Category extracted from parsed text
          items // Array of menu items extracted from parsed text
        }
      ]
    });

    // Save the menu item
    await menu.save();

    // Return success response
    res.status(201).json({ msg: 'Item added successfully' });
  } catch (error) {
    console.error('Error adding:', error);
    res.status(500).json({ msg: 'Error adding:' });
  }
};


export { login, register, dashboard, addItem };
