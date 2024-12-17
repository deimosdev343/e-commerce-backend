import mongoose from "mongoose";

interface IOrder {
  _id: string,
  orderId: string,
  productId: string,
  quantity: Number,
  price: Number
}

const orderSchema = new mongoose.Schema<IOrder>({
  orderId: {
    type: String,
    required: true
  },
  productId: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number
  }
});

export default mongoose.model<IOrder>("Order", orderSchema);