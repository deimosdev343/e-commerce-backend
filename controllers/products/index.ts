import { Request, Response } from 'express';
import Product from '../../Models/Product';
import Category from '../../Models/Category';


const sortOptions = {
  "priceDesc":{price:-1},
  "priceAsc":{price: 1},
  "createdAtDesc":{createdAt:-1},
  "createdAtAsc":{createdAt:1}
}
export async function  getProducts(req: Request, res: Response): Promise<any> {
  try {
    let {limit, category, sortBy, name} = req.query;

    let sort: {
      createdAt?: 1 | -1,
      price?: 1 | -1
    } = {
      createdAt: -1
    }
    const query: {
      category?: string | undefined,
      name?: {"$regex": string | undefined, "$options":"i"} | undefined,
    } = {};
    if(category) {
      query.category = String(category);
    }
    if(name) {
      query.name = {"$regex": String(name), "$options":"i"} 
    }
    if(sortBy == "createdAtAsc") sort = {createdAt: 1};
    if(sortBy == "createdAtDesc") sort = {createdAt: -1};
    if(sortBy == "priceAsc") sort = {price: 1};
    if(sortBy == "priceDesc") sort = {price: -1};

      
    
    const products = await Product
      .find(query)
      .sort(sort)
      .limit(Number(limit) || 10);
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
      category,
      extraImages,
      colors,
      sizes
    } = req.body;
    
    const existingCategory = Category.findOne({name:category});
    if(!existingCategory) {
      return res.status(401).json({msg:"This category doesn't exist"});
    }
    
    const product = new Product({
      name,
      description,
      image,
      price,
      category,
      extraImages,
      colors,
      sizes
    });
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
      category,
      extraImages,
      colors,
      sizes
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
      category,
      extraImages,
      colors,
      sizes
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