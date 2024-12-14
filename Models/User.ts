import mongoose from "mongoose";

interface IUser {
  id: string, 
  email: string,
  password: string,
  role: string,
  name: string,
  address: string
}

const UserSchema = new mongoose.Schema<IUser>({
  id:{type:String, required: true},
  email:{type:String, required: true},
  password:{type:String, required: true},
  role:{type:String, default:"user"},
  name:{type:String},
  address:{type:String},
});

export default mongoose.model<IUser>("user", UserSchema); 
