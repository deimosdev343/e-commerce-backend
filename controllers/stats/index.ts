import { Request, Response } from 'express';
import Stat from '../../Models/Stat';
import Product, { IProduct } from '../../Models/Product.ts';
import ItemViewCount from '../../Models/ItemViewCount.ts';
import { ProductType } from '../../types/product/product.ts';
import ItemOrderCount from '../../Models/ItemOrderCount.ts';

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

export const getLatestViewsAndPurchases = async (req:Request, res:Response): Promise<any> => {
  try {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const monthsToSubtract = 1;
    const count : {[key: string] : {viewCount: number, orderCount: number}} = {}
    currentDate.setMonth(currentMonth - monthsToSubtract);
    const orders = await Stat.find({
        type:"purchase",
        updatedAt:{$gte: currentDate.toISOString()}
      })
      .sort({updatedAt:-1})
      .lean();
    for(let i = 0; i < orders.length; i++) {
      if(count[String(orders[i].updatedAt?.toISOString()).split("T")[0]]) {
        count[String(orders[i].updatedAt?.toISOString()).split("T")[0]].orderCount +=1
      } else {
        count[String(orders[i].updatedAt?.toISOString()).split("T")[0]] = {orderCount: 1, viewCount: 0}
      }
    }
    const views = await Stat.find({
        type:"view",
        updatedAt:{$gte: currentDate.toISOString()}
      })
      .sort({updatedAt: -1})
      .lean();
    for(let i = 0; i < views.length; i++) {
      if(count[String(views[i].updatedAt?.toISOString()).split("T")[0]]) {
        count[String(views[i].updatedAt?.toISOString()).split("T")[0]].viewCount +=1
      } else {
        count[String(views[i].updatedAt?.toISOString()).split("T")[0]]= {orderCount: 0, viewCount: 1};
      }
    }

    return res.status(200).json(count)
  } catch (err) {
    console.log(err);
    return res.status(500).json({msg:"Unknown Error"});
  }
}

export const getMostPurchasedProducts = async (req:Request, res: Response): Promise<any> => {
  try {
    const purchases = await ItemOrderCount.find({}).sort({amount: -1}).limit(5).lean();
    let productResult : Array<{
      product: ProductType,
      orders: number
    }> = [];
    for(let i =0; i< purchases.length; i++) {
      const currProd = await Product.findOne({_id: purchases[i].productId}).lean();
      if(currProd) {
        productResult.push({
          orders: purchases[i].amount,
          product: {
            category: currProd.category,
            colors: currProd.colors,
            description: currProd.description,
            extraImages: currProd.extraImages,
            image: currProd.image,
            name: currProd.name,
            price: currProd.price.valueOf(),
            sizes: currProd.sizes,
            discountId: ""
          } 
        });
      } 
    }
    return res.status(200).json(productResult);
  } catch (err) {
    console.log(err);
    return res.status(500).json({msg:"Unknown Error"})
  }
    
}

export const getMostViewedProduct = async (req:Request, res:Response): Promise<any> => { 
  try {
    const views = await ItemViewCount.find({}).sort({amount: -1}).limit(5).lean();
    let productResult : Array<{
      product: ProductType,
      views: number
    }> = [];

    for(let i =0; i< views.length; i++) {
      const currProd = await Product.findOne({_id: views[i].productId}).lean();
      if(currProd) {
        productResult.push({
          views: views[i].amount,
          product: {
            category: currProd.category,
            colors: currProd.colors,
            description: currProd.description,
            extraImages: currProd.extraImages,
            image: currProd.image,
            name: currProd.name,
            price: currProd.price.valueOf(),
            sizes: currProd.sizes,
            discountId: ""
          } 
        });
      }
    }

    return res.status(200).json(productResult);
  } catch (err) {
    console.log(err);
    return res.status(500).json({msg:"Unknown Error"});
  }
}