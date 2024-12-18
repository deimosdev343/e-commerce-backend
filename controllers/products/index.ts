import { Request, Response } from 'express';
import Product from '../../Models/Product';

export async function  getProducts(req: Request, res: Response) {
  try {
    res.status(200).json({msg:"Test"})
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

export async function getProductId(req: Request, res: Response) {
  try {
    res.status(200).json({msg:"Test"});
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server Error");
  }
}

export async function createProduct(req: Request, res: Response): Promise<any> {
  try {
    const {
      name, 
      description, 
      image,
      price
    } = req.body;
    
    const product = new Product({name, description, image, price});
    await product.save();
    return res.status(200).json({msg:"Product Created"});
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server Error");
  }
}


export async function editProduct(req: Request, res: Response) {
  try {
    res.status(200).json({msg:"Test"});
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server Error");
  }
}


export async function deleteProduct(req: Request, res: Response) {
  try {
    res.status(200).json({msg:"Test"});
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server Error");
  }
}