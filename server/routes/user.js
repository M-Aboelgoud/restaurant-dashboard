import express from "express";
const router = express.Router();

import {
  login,
  register,
  dashboard,
  addItem,
} from "../controllers/user.js";
import authMiddleware from "../middleware/auth.js";
import upload from "../middleware/uploadPdf.js";

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/dashboard").get(authMiddleware, dashboard);
router.route("/addItem").post(authMiddleware, upload, addItem);
//router.post("/addbook",upload,addBook)


export default router;
