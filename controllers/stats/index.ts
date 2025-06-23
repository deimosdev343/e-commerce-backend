import { Request, Response } from 'express';
import Stat from '../../Models/Stat';

export const getLatestViews = async (req:Request, res:Response): Promise<any> => {
  try {
    const views = await Stat.find({type:"view"}).sort({lastUpdateDate:"desc"}).limit(10).lean();
    return res.status(200).json(views);
    
  } catch (err) {
    console.log(err);
  }
}