import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute"

mongoose.connect(process.env.MONGODB_URL as string).then(() => {
  console.log("your are connected to data base")
})


const app = express();
app.use(cors());
app.use(express.json());



app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});

app.use("/api/my/user", myUserRoute)


  app.listen(8080, () => {
    console.log("server started on localhost:8080");
  });