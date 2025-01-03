import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import workshopRoute from "./routes/workshopRoute.js";
dotenv.config({});
const app = express();
//database conncection
connectDB();

const PORT = process.env.PORT || 8000;

//default middleware
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//apis

app.use("/api/v1/user", userRoute);
app.use("/api/v1/workshop", workshopRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
