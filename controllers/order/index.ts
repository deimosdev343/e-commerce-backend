import { Request, Response } from 'express';
import Order from '../../Models/Order';
import { IProduct } from '../../Models/Product';
import { createOrderStatistic } from '../../serivces/Statistics/Statistics';

export const createOrder = async (req: Request, res: Response) : Promise<any> => {
   try {
    const {products} = req.body;
     let totalPrice = 0;
     products.forEach((prod: IProduct) => {
      totalPrice = totalPrice + Number(prod.price);
     });

    const order = new Order({
      userId: req.userId,
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
      })
    }
    return res.status(200).json({msg:"Order Successfully Created"})
   } catch (err) {
    console.log(err);
    return res.status(500).json({msg:"Internal Server Error"});

   }
}