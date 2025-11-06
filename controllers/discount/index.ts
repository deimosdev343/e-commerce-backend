import dayjs from 'dayjs';
import { Request, Response } from 'express';
import Discount from '../../Models/Discount';

export const createDiscount = async (req: Request, res: Response): Promise<any> => {
  try {
    let {description, image, discountAmount, startDate, endDate} = req.body;
    startDate = dayjs(startDate);
    endDate = dayjs(endDate);
    
    const discount = new Discount({
      description,
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