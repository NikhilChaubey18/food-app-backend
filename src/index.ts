import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute"
import  myRestaurantRoute from "./routes/MyRestaurantRoutes"
import {v2 as cloudinary} from"cloudinary";

mongoose.connect(process.env.MONGODB_URL as string).then(() => {
  console.log("your are connected to data base")
});

cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
})


const app = express();
app.use(cors());
app.use(express.json());



app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});

app.use("/api/my/user", myUserRoute)
app.use("/api/my/restaurant", myRestaurantRoute)


  app.listen(8080, () => {
    console.log("server started on localhost:8080");
  });