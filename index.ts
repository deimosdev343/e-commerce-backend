import express, { json, urlencoded } from "express";
import ProductRouter from "./routes/products/ProductRouter";
import { connection } from "./db/connection";
import AuthRouter from "./routes/auth/AuthRouter";

import dotenv from 'dotenv';
dotenv.config();


const port = process.env.PORT || 8000;

const app = express();
app.use(urlencoded({ extended: false }));
app.use(json());

app.use("/products", ProductRouter);
app.use("/auth", AuthRouter);
await connection();

app.listen(port, () => {
  console.log(`Started Backend on port ${port}`);
})