import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export const verifyToken = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
  const token = req.header('Authorization')?.split(" ")[1];
  console.log(token);
  if(!token) {
    return res.status(401).json({msg:"Token Is Invalid"});
  }
  try {
    const secret = String(process.env.JWT_SECRET);
    const decoded = await jwt.verify(token, secret);
    if (typeof decoded !== 'object' || !decoded?.userId) {
      res.status(401).json({ error: 'Access denied' });
      return;
    }
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({msg:"Internal Server Error"});
  }
}