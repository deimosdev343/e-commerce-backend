import express, { json, urlencoded } from "express";
import ProductRouter from "./routes/products/ProductRouter.ts";
import { connection } from "./db/connection.ts";
import AuthRouter from "./routes/auth/AuthRouter.ts";

import dotenv from 'dotenv';
import OrderRouter from "./routes/orders/OrderRouter.ts";
import CategoryRouter from "./routes/category/CategoryRouter.ts";
import { initAdminFunc } from "./serivces/initAdmin.ts";
import StatsRouter from "./routes/stats/StatsRouter.ts";
import DiscountRouter from "./routes/discount/DiscountRouter.ts";
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
app.use("/stats", StatsRouter);
app.use("/discounts", DiscountRouter);
await connection();

app.listen(port, () => {
  console.log(`Started Backend on port ${port}`);
})