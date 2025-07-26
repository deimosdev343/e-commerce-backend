import { Request, Response } from 'express';
import Order from '../../Models/Order';
import { ICartProduct, IProduct } from '../../Models/Product';
import { createOrderStatistic, updateBuyCounter } from '../../serivces/Statistics/Statistics';

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