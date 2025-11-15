import mongoose from "mongoose"

export interface IDiscount {
  description: string,
  image: string,
  discountAmount: Number,
  startDate: Date,
  endDate: Date,
  discountId: string,
  background: string
}

const discountSchema = new mongoose.Schema<IDiscount>({
  discountId: {
    type: String
  },
  description:{
    type: String,
    required: true
  },
  image:{
    type: String,
    required: true
  },
  background: {
    type: String,
  },
  discountAmount: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
});

export default mongoose.model<IDiscount>("Discount", discountSchema);