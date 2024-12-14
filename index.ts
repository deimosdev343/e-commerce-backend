import express from "express";
import dotenv from 'dotenv';
import ProductRouter from "./routes/products/ProductRouter";

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

app.use("/products", ProductRouter);

app.listen(port, () => {
  console.log(`Started Backend on port ${port}`);
})