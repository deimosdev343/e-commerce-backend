import { Request, Response } from 'express';

export async function  getProducts(req: Request, res: Response) {
  try {
    
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}