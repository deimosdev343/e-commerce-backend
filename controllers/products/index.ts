import { Request, Response } from 'express';
import Product from '../../Models/Product';
import Category from '../../Models/Category';

export async function  getProducts(req: Request, res: Response): Promise<any> {
  try {
    let {limit, category} = req.query;
    const query: {category?: string | undefined} = {};
    if(category) {
      query.category = String(category);
    }
    const products = await Product.find(query).sort({timestamp :-1}).limit(Number(limit) || 10);
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
      price,
      category
    } = req.body;
    
    const existingCategory = Category.findOne({name:category});
    if(!existingCategory) {
      return res.status(401).json({msg:"This category doesn't exist"});
    }
    
    const product = new Product({name, description, image, price, category});
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
      price,
      category
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
      price,
      category
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