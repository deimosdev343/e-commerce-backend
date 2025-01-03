import { Request, Response } from 'express';
import Category from '../../Models/Category';

export const getCategories = async (req: Request, res: Response) : Promise<any> => {
  try {
    const categories = await Category.findOne({});
    return res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    return res.status(500).json({msg:"Internal Server Error"});
  }
}

export const createCategory = async (req: Request, res: Response) : Promise<any> => {
  try {
    const {name} = req.body;
    const category = new Category({name});
    await category.save();
    return res.status(200).json({msg:"Category Successfully created"});
  } catch (err) {
    console.log(err);
    return res.status(500).json({msg:"Internal Server Error"});   
  }
}