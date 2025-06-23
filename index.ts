import express, { json, urlencoded } from "express";
import ProductRouter from "./routes/products/ProductRouter";
import { connection } from "./db/connection";
import AuthRouter from "./routes/auth/AuthRouter";

import dotenv from 'dotenv';
import OrderRouter from "./routes/orders/OrderRouter";
import CategoryRouter from "./routes/category/CategoryRouter";
import { initAdminFunc } from "./serivces/initAdmin";
import StatsRouter from "./routes/stats/StatsRouter";
dotenv.config();

const port = process.env.PORT || 8000;

const app = express();
app.use(urlencoded({ extended: false }));
app.use(json());
if(process.env.INIT_ADMIN == "true") {
  initAdminFunc();
}
app.use("/products", ProductRouter);
app.use("/auth", AuthRouter);
app.use("/order", OrderRouter);
app.use("/category", CategoryRouter);
app.use("/stats", StatsRouter)
await connection();

app.listen(port, () => {
  console.log(`Started Backend on port ${port}`);
})