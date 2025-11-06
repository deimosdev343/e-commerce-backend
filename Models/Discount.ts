import mongoose from "mongoose"

export interface IDiscount {
  productIds: string[],
  description: string,
  image: string,
  discountAmount: Number,
  startDate: Date,
  endDate: Date
}

const discountSchema = new mongoose.Schema<IDiscount>({
  productIds: {
    type: [{
      type: String
    }]
  },
  description:{
    type: String,
    required: true
  },
  image:{
    type: String,
    required: true
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