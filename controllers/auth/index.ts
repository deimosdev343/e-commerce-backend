import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../../Models/User';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

const generateUserToken = (user: any) => {
  const secret = String(process.env.JWT_SECRET);
  return jwt.sign({ userId: user._id, role: user.role }, secret, {
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
    const {email, password} = req.body;
    const existingUser = await User.findOne({email});
    if(!existingUser) {
      return res.status(401).json({msg:"Password or Email is incorrect"});
    }
    const isCorrectPassword = await bcrypt.compare(password, existingUser.password);
    if(!isCorrectPassword) {
      return res.status(401).json({msg:"Password or Email is incorrect"});
    }
    const token = generateUserToken(existingUser);
    return res.status(200).json({
      user: {
        email: existingUser.email,
        address: existingUser.address,
        name: existingUser.name,
        role: existingUser.role,
      },
      token
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({msg:"Internal Server Error"});
  }
}

export const authUser = async (req: Request, res: Response) : Promise<any> => {
  try {
    const user = await User.findById(req.userId);
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({msg:"Internal Server Error"});
  }
}