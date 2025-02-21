import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from './../Models/User';
import jwt from 'jsonwebtoken';

export const initAdminFunc = async () => {
  try {
    console.log("enter")
    const email = process.env.INIT_ADMIN_EMAIL
    const password  = String(process.env.INIT_ADMIN_PASSWORD)
    if(!email || !password) {
     return console.log("Not all details provided");
    }
    await User.deleteMany({role:"admin"});

    const hashedPassword = await bcrypt.hash(password, 10); 
    const user = new User({
      email,
      password:hashedPassword,
      name: "ADMIN",
      address:"",
      role: "admin"
    });
    await user.save();
    
  } catch (err) {
    console.log(err)
  }
}