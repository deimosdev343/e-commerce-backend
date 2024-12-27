import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../../Models/User';
import jwt from 'jsonwebtoken';

const generateUserToken = (user: any) => {
  return jwt.sign({ userId: user.id, role: user.role }, 'your-secret', {
    expiresIn: '30d',
  });
};


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
    return res.status(500).json({msg:"You can't change the current reality and the ZONE kick you out"});
  }
}

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  try {
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({msg:""});
  }
}