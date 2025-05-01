import mongoose from "mongoose";


export interface IProduct {
  type: "view" | "purchase",
  productId: string,
  purchaseId?: string,
  
}