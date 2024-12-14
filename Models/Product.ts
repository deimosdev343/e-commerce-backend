import mongoose, { model } from "mongoose";

interface IProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  price: Number;
}

const productSchema = new mongoose.Schema<IProduct>({
  id: {type: String, required: true},
  name: {type: String, required: true},
  description: {type: String, required: true},
  image: {type: String},
  price: {type: Number, required: true}
});

export default mongoose.model<IProduct>("product",productSchema) 