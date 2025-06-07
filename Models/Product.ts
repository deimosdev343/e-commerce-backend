import mongoose from "mongoose";

export interface ICartProduct {
  name: string,
  image: string,
  price: Number,
  color: string,
  size: string,
  amount: Number
}

export interface IProduct {
  name: string,
  description: string,
  image: string,
  price: Number,
  category: string,
  colors: string[],
  sizes: string[],
  extraImages: string[]
}

const productSchema = new mongoose.Schema<IProduct>({
  name: {type: String, required: true},
  description: {type: String, required: true},
  image: {type: String},
  price: {type: Number, required: true},
  category: {type: String, required: true},
  sizes: {type: [{type: String}]},
  colors: {type: [{type: String}]},
  extraImages: {type: [{type: String}]}
  
}, {timestamps: true});

export default mongoose.model<IProduct>("product",productSchema) 