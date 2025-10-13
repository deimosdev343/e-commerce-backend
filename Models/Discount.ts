export interface IDiscount {
  productIds: string[],
  description: string,
  image: string,
  discountAmount: Number,
  startDate: Date,
  endDate: Date
}