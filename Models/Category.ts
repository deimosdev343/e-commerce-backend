import mongoose from "mongoose"

interface ICategory {
  name: string,
  image: String
}

const categorySchema = new mongoose.Schema<ICategory>({
  name:{
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

export default mongoose.model<ICategory>("Category",categorySchema);