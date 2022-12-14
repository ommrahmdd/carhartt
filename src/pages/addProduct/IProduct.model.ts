export interface IProduct {
  code: string;
  name: string;
  type: string;
  category: string;
  price: number;
  discount: number;
  quantity: number;
  colors: string[];
  size: string[];
  images: any[];
  description: string;
  shipping: string;
  returns: string;
  year: string;
  season: string;
  _id?: string;
}
