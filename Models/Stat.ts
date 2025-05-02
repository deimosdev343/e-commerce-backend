import mongoose from "mongoose";


export interface IStat {
  type: "view" | "purchase",
  productId: string,
  purchaseId?: string,
  ip?: string
  
}

const statSchema = new mongoose.Schema<IStat>({
  type: {
    type: String,
    required: true
  },
  productId: {
    type: String,
    required: true
  },
  purchaseId: {
    type: String
  },
  ip: {
    type: String
  }
})

export default mongoose.model<IStat>("Stat", statSchema);