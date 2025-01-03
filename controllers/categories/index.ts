import { Request, Response } from 'express';
import Category from '../../Models/Category';

export const getCategories = async (req: Request, res: Response) : Promise<any> => {
  try {
    const categories = await Category.find({});
    return res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    return res.status(500).json({msg:"Internal Server Error"});
  }
}

export const createCategory = async (req: Request, res: Response) : Promise<any> => {
  try {
    const {name, image} = req.body;
    const existingCategory = await Category.findOne({name});
    if(existingCategory) {
      return res.status(401).json({msg:"Category already exists"});
    }
    const category = new Category({name, image});
    await category.save();
    return res.status(200).json({msg:"Category Successfully created"});
  } catch (err) {
    console.log(err);
    return res.status(500).json({msg:"Internal Server Error"});   
  }
}