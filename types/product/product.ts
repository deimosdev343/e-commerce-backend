export interface ProductType {
  category: string,
  colors: Array<string>,
  createdAt?: string,
  description: string,
  extraImages: Array<string>,
  image: string,
  name: string,
  discountId: string,
  price: number,
  sizes: Array<string>
  updatedAt?: string
}