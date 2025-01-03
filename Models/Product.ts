import mongoose from "mongoose";

export interface IProduct {
  name: string;
  description: string;
  image: string;
  price: Number;
  category: string;
}

const productSchema = new mongoose.Schema<IProduct>({
  name: {type: String, required: true},
  description: {type: String, required: true},
  image: {type: String},
  price: {type: Number, required: true},
  category: {type: String, required: true}
});

export default mongoose.model<IProduct>("product",productSchema) 