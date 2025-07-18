import mongoose from "mongoose"

interface IItemViewCount {
  productId: string,
  amount: number
}

const ItemViewCountSchema = new mongoose.Schema<IItemViewCount>({
  productId: {
    type: String,
    required: true
  },
  amount: {
    type:Number,
    required: true
  }
});

export default mongoose.model<IItemViewCount>("ItemViewCount", ItemViewCountSchema);

