import mongoose from "mongoose";
import { IProduct } from "./Product";

interface IOrder {
  userId: string,
  products: Array<IProduct>,
  price: Number
}

const orderSchema = new mongoose.Schema<IOrder>({
  userId: {
    type: String,
    required: true,
  },
  products: [],
  price: {
    type: Number
  }
});

export default mongoose.model<IOrder>("Order", orderSchema);