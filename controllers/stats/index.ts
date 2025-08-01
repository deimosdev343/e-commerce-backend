import { Request, Response } from 'express';
import Stat from '../../Models/Stat';
import Product, { IProduct } from '../../Models/Product';
import ItemViewCount from '../../Models/ItemViewCount';

export const getLatestViews = async (req:Request, res:Response): Promise<any> => {
  try {
    const views = await Stat.find({type:"view"}).sort({updatedAt: -1}).limit(10).lean();
    return res.status(200).json(views);
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({msg:"Unknown Error"});

  }
}

export const getLatestPurchases = async (req:Request, res:Response): Promise<any> => {
  try {
    const orders = await Stat.find({type:"purchase"}).sort({updatedAt:-1}).limit(10).lean();
    return res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    return res.status(500).json({msg:"Unknown Error"});
     
  }
}

export const getMostViewedProduct = async (req:Request, res:Response): Promise<any> => { 
  try {
    const views = await ItemViewCount.find({}).sort({amount: -1}).limit(5).lean();
    // let productResult : [{
    //   product: 
    // }] = [] 
    for(let i =0; i< views.length; i++) {

    }
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({msg:"Unknown Error"});
  }

}