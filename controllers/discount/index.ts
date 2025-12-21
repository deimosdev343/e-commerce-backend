import dayjs from 'dayjs';
import { Request, Response } from 'express';
import Discount from '../../Models/Discount';
import {v4} from 'uuid'
import Product from '../../Models/Product';

export const editDiscount = async (req: Request, res: Response): Promise<any> => {
  try {
    let {discountId,description, image, background, discountAmount, startDate, endDate} = req.body;
    startDate = dayjs(startDate);
    endDate = dayjs(endDate);

    const existingDiscount = await Discount.findOne({discountId});
    if(!existingDiscount) {
      return res.status(404).json({msg:"Discount doesn't exist"});
    }
    await Discount.findOneAndUpdate({discountId}, {$set: {
      description,
      image,
      background,
      discountAmount,
      startDate,
      endDate
    }});
    res.status(200).json({msg:"Discount updated successfully"});
    
  } catch (err) {
    console.log(err);
  }
}

export const createDiscount = async (req: Request, res: Response): Promise<any> => {
  try {
    let {description, image, background, discountAmount, startDate, endDate} = req.body;
    startDate = dayjs(startDate);
    endDate = dayjs(endDate);
    
    const newId = v4().toString();
    
    const discount = new Discount({
      discountId: newId,
      description,
      image,
      discountAmount,
      background,
      startDate,
      endDate
    });

    await discount.save();

    return res.status(200).json({msg:"Discount Created successfully"});
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

export const getDiscountsForClient = async (req: Request, res: Response): Promise<any> => {
  try {
    let currDate = dayjs().toDate();
    const discounts = await Discount.find({endDate:{$gte: currDate}}).limit(5);
    return res.status(200).json(discounts);
  } catch (err) {
    console.log(err);
    return res.status(500).json({msg:"Internal Server Error"});
  }
}

export const getDiscounts = async (req: Request, res: Response): Promise<any> => {
  let {description, startDate, endDate, limit}  = req.query
  try {
    let cStartDate = dayjs(String(startDate));
    let cEndDate = dayjs(String(endDate));
    let query: {
      description?: { $regex: string; $options: string; }
      startDate?: Date
      endDate?:Date
    } = {};
    
    if(description) {
      query.description = {"$regex": String(description), "$options":"i"}     
    }
    if(startDate) query.startDate = cStartDate.toDate();
    if(endDate) query.endDate = cEndDate.toDate();
    console.log(query)
    //Removing start And end date for now
    const discounts = await Discount.find().limit(Number(limit) || 10).lean();

    return res.status(200).json(discounts);
  } catch (err) {
    console.log(err)
  }
}

export const deleteDiscount = async (req: Request, res: Response): Promise<any> => {
  try {
    const {discountId} = req.query;
    console.log(discountId)
    const discount = await Discount.findOne({discountId});
    if(!discount) {
      return res.status(404).json({msg:"discount not found"});
    }
    await Discount.findOneAndDelete({discountId});
    return res.status(200).json({msg:"Discount deleted Successfully"});
  } catch (err) {
    console.log(err);
  }
}

export const addItemToDiscount = async (req: Request, res: Response): Promise<any> => {
  try {
    const {prodId, discountId} = req.body;
    const discount = await Discount.findOne({discountId}).lean();
    const product = await Product.findById(prodId);
    if(!discount) {
      return res.status(404).json({msg:"discount not found"});
    }
    if(!product) {
      return res.status(404).json({msg:"product not found"});
    }
    let discountProds = discount.productIds;
    if(discountProds.findIndex(pid => pid == prodId) > -1) {
      return res.status(401).json({msg:"product is already included in this discount"});
    }
    discountProds = [...discountProds, prodId];
    await Discount.findOneAndUpdate({discountId}, {$set:{productIds: discountProds}});
    return res.status(200).json({msg: "Discount products Successfully updated "});
    
  } catch (err) {
    console.log(err);
  }
}

export const removeItemToDiscount = async (req: Request, res: Response): Promise<any> => {
  try {
    const {prodId, discountId} = req.body;
    const discount = await Discount.findOne({discountId}).lean();
    const product = await Product.findById(prodId);
    if(!discount) {
      return res.status(404).json({msg:"discount not found"});
    }
    if(!product) {
      return res.status(404).json({msg:"product not found"});
    }
    let discountProds = discount.productIds;
    if(discountProds.findIndex(pid => pid == prodId) == -1) {
      return res.status(401).json({msg:"product doesn't exist in discount"});
    }
    discountProds = discountProds.filter(p => p != prodId);
    await Discount.findOneAndUpdate({discountId}, {$set:{productIds: discountProds}});
    return res.status(200).json({msg:"product removed from discount"});
  
  } catch (err) {
    console.log(err);
  }
}