import mongoose from "mongoose"

interface IItemOrderCount {
  productId: string,
  amount: number
}

const ItemOrderCountSchema = new mongoose.Schema<IItemOrderCount>({
  productId: {
    type: String,
    required: true
  },
  amount: {
    type:Number,
    required: true
  }
});

export default mongoose.model<IItemOrderCount>("ItemOrderCount", ItemOrderCountSchema);

