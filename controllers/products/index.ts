import { Request, Response } from 'express';
import Product from '../../Models/Product';

export async function  getProducts(req: Request, res: Response): Promise<any> {
  try {
    let {limit} = req.query;
    const products = await Product.find({}).limit(Number(limit) || 10);
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

export async function getProductId(req: Request, res: Response): Promise<any> {
  try {
    const {id} = req.query;

    const product = await Product.findById(id);
    if(!product) {
      return res.status(401).json({msg:"Product not found"});
    }
    res.status(200).json(product);
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


export async function editProduct(req: Request, res: Response):Promise<any> {
  try {
    const {
      id,
      name, 
      description, 
      image,
      price
    } = req.body;
    if(id.length < 1) {
      return res.status(401).json({msg:"Id cannot be null"});
    }
    const product = await Product.findById(id);
    if(!product) {
      return res.status(401).json({msg:"Product Not Found"});
    }
    await Product.findByIdAndUpdate(id, {$set: {
      name,
      description,
      image,
      price
    }});

    res.status(200).json({msg:"Product successfully updated"});
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server Error");
  }
}


export async function deleteProduct(req: Request, res: Response):Promise<any> {
  try {
    const {id} = req.query;
    const product = await Product.findById(id);
    if(!product) {
      return res.status(401).json({msg:"Product Not Found"});
    }
    await Product.findByIdAndDelete(id);
    res.status(200).json({msg:"Product Sucessfully deleted"});
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal server Error");
  }
}