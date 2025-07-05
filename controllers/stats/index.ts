import { Request, Response } from 'express';
import Stat from '../../Models/Stat';
import Product, { IProduct } from '../../Models/Product';

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
    const productLookup : {[k: string] : number} = {} 
    const views = await Stat.find({type:"view"}).lean();
    for(let i = 0; i < views.length; i++) {
      if(productLookup[views[i].productId]) {
        productLookup[views[i].productId] +=1
      } else {
        productLookup[views[i].productId] =1
      }
    }
    const productValueArr : Array<{id: string, count: number, prod?: IProduct | null}> = []
    
    Object.keys(productLookup).map(async k => {
      productValueArr.push({id: k, count: productLookup[k], prod: await Product.findOne({_id: k}).lean() });
    })
    
    return res.status(200).json(productValueArr)
  } catch (err) {
    console.log(err);
    return res.status(500).json({msg:"Unknown Error"});
  }

}