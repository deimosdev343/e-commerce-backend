import express, { json, urlencoded } from "express";
import dotenv from 'dotenv';
import ProductRouter from "./routes/products/ProductRouter";
import { connection } from "./db/connection";

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();
app.use(urlencoded({ extended: false }));
app.use(json());

app.use("/products", ProductRouter);
await connection();

app.listen(port, () => {
  console.log(`Started Backend on port ${port}`);
})