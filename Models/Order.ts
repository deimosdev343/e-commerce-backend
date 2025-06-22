import mongoose from "mongoose";

interface IOrder {
  products: Array<any>, //What the fuck ever dude
  price: Number
}

const orderSchema = new mongoose.Schema<IOrder>({
  products: [],
  price: {
    type: Number
  }
});

export default mongoose.model<IOrder>("Order", orderSchema);