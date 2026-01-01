import { Request, Response } from 'express';
import Order from '../../Models/Order';
import { ICartProduct, IProduct } from '../../Models/Product';
import { createOrderStatistic, updateBuyCounter } from '../../serivces/Statistics/Statistics';
import { ProductType } from '../../types/product/product';
import Discount from '../../Models/Discount';

export const createOrder = async (req: Request, res: Response) : Promise<any> => {
   try {
    const {products} = req.body;
     let totalPrice = 0;
     products.forEach((prod: ICartProduct) => {
      totalPrice = totalPrice + Number(prod.price)* Number(prod.amount);
     });

    const order = new Order({
      products,
      price: totalPrice
    });

    await order.save();
    for(let i = 0; i < products.length; i++) {
      createOrderStatistic({
        type: "purchase",
        productId: products[i].id,
        purchaseId: order._id.toString(),
        ip:""   
      });
      updateBuyCounter(products[i].id);
    }
    return res.status(200).json({msg:"Order Successfully Created"})
   } catch (err) {
    console.log(err);
    return res.status(500).json({msg:"Internal Server Error"});

   }
}


export const calculateOrder = async (req: Request, res: Response): Promise<any> => {
  try {
    const {products} : {products: Array<ProductType>} = req.body;
    let productPrices:Array<{
      type: "product" | "discount",
      price: number | undefined,
      name: string
    }> = [];

    for(let i = 0; i< products.length; i++) {
      productPrices.push({
        type: "product",
        price: products[i].price,
        name: products[i].name
      });
      if(products[i].discountId) {
        const discount = await Discount.findOne({discountId:products[i].discountId }).lean();
        const discountName = `${discount?.description} %${discount?.discountAmount} off`
        const discountPrice = (products[i].price * parseFloat(`0.${discount?.discountAmount}`)) * -1;
        productPrices.push({
          type: "discount",
          price: discountPrice,
          name: discountName 
        });
      }
    }
    return res.status(200).json({priceList: productPrices});
  } catch (err) {
    console.log(err);
    return res.status(500).json({msg:"Internal Server Error"});
  }
}