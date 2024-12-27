import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../../Models/User';


export const registerUser = async (req: Request, res: Response) : Promise<any> => {
  try {
    const {email, password, name, address} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({email});
    if(existingUser) {
      return res.status(401).json({msg:"User already exists with this email"});
    }
    const user = new User({
      email,
      password:hashedPassword,
      name,
      address,
      role: "user"
    });
    await user.save();
    return res.status(201).json({msg: "User Successfully created"});
  } catch (err) {
    console.log(err);
    return res.status(500).json({msg:"You can't change current reality and the zone kick you out"});
  }
} 