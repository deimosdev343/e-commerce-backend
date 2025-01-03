import mongoose from "mongoose"

interface ICategory {
  name: string,
}

const categorySchema = new mongoose.Schema<ICategory>({
  name:{
    type: String
  }
});

export default mongoose.model<ICategory>("Category",categorySchema);