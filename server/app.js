import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { client } from "./utils/db.js";
import cloudinary from "cloudinary";
import productRouter from "./router/product.js";
import authRouter from "./router/auth.js";
import axios from "axios";

async function init() {
  dotenv.config();
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
  });
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());

  const port = process.env.PORT || 4000;

  try {
    await client.connect();
  } catch (error) {
    console.log(error);
  }

  app.use("/product", productRouter);
  app.use("/auth", authRouter);
  app.use("/province", async (req, res) => {
    try {
      const url =
        "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json";
      const result = await axios.get(url);
      const data = result.data;
      return res.status(200).json({ data: data });
    } catch (error) {
      console.log(error);
    }
  });

  app.get("/", (req, res) => {
    res.send("test");
  });

  app.get("*", (req, res) => {
    res.status(404).send("Not found endpoint");
  });

  app.listen(port, () => {
    console.log(`Server is running at ${port}`);
  });
}

init();
