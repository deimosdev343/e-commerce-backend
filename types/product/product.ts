export interface Product {
   _id: string,
  category: string,
  colors: Array<string>,
  createdAt?: string,
  description: string,
  extraImages: Array<string>,
  image: string,
  name: string,
  price: number,
  sizes: Array<string>
  updatedAt?: string
}