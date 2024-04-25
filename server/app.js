import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./db/connect.js";
import cors from "cors";
import mainRouter from "./routes/user.js";
import orderRouter from "./routes/orderRoute.js";
// Import the functions you need from the SDKs you need



dotenv.config();
const app = express();
app.use(express.json());
app.use("/documents", express.static("documents"));
app.use(cors());
app.use("/api/v1", mainRouter);
app.use("/api/v1/orders", orderRouter);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
