import mongoose from "mongoose";

interface IOrder {
  userId: string,
  products: Array<any>, //What the fuck ever dude
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