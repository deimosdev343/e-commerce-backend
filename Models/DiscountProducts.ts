import mongoose from "mongoose"


export interface IDiscountProducts {
  discountId: string,
  productIds: Array<string>,
  startDate: Date,
  endDate: Date
}

const discountProductsSchema = new mongoose.Schema<IDiscountProducts>({
  discountId: {
    type: String,
    required: true
  },
  productIds: {
    type:[{
      type:String
    }]
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  }
});

export default mongoose.model<IDiscountProducts>("DiscountProducts", discountProductsSchema);



