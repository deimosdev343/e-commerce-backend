import dayjs from 'dayjs';
import { Request, Response } from 'express';
import Discount from '../../Models/Discount';

export const createDiscount = async (req: Request, res: Response): Promise<any> => {
  try {
    let {description, productIds, image, discountAmount, startDate, endDate} = req.body;
    startDate = dayjs(startDate);
    endDate = dayjs(endDate);
    
    const discount = new Discount({
      description,
      productIds,
      image,
      discountAmount,
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

export const getDiscounts = async (req: Request, res: Response): Promise<any> => {
  let {description, startDate, endDate, limit} = req.query
  try {
    let cStartDate = dayjs(String(startDate));
    let cEndDate = dayjs(String(endDate));
    let query: {
      description?: { $regex: string; $options: string; }
      startDate?: Date
      endDate?:Date
    } = {};
    
    if(description) {
      query.description = {"$regex": String(name), "$options":"i"}     
    }
    if(startDate) query.startDate = cStartDate.toDate();
    if(endDate) query.endDate = cEndDate.toDate();
    
    const discounts = await Discount.find({
      startDate:{$gte:cStartDate},
      endDate:{$lte:cEndDate}
    }).limit(Number(limit) || 10).lean();

    return res.status(200).json(discounts);
  } catch (err) {
    console.log(err)
  }
}