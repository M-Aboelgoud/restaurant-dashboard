import multer from "multer";
import path from "path";
import fs from "fs";

// Define storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Get the user's email from the request
    const userEmail = req.user.email;
    // Create the user's folder if it doesn't exist
    const userFolderPath = path.join(`./documents/${userEmail}`);
    fs.mkdirSync(userFolderPath, { recursive: true }); // Ensure the directory is created recursively
    cb(null, userFolderPath); // Set destination to the user's folder
  },
  filename: function (req, file, cb) {
    // Extract the file extension from the original filename
    const fileExtension = path.extname(file.originalname);
    // Name the file "img" with the original file extension
    const newFileName = `img${fileExtension}`;
    cb(null, newFileName);
  },
});
// Initialize multer upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 15728640 }, // Limit file size (1MB in this example)
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("pdf"); // 'pdf' is the name attribute of your file input field

function checkFileType(file, cb) {
  // Get the file extension
  const extname = path.extname(file.originalname).toLowerCase();
  // Check if the file extension is either .pdf or .txt
  if (extname === ".pdf" || extname === ".txt" || extname === ".jpg" || extname === ".png") {
    return cb(null, true);
  } else {
    cb("Error: PDF or TXT or JPG files only!");
  }
}

export default upload;
