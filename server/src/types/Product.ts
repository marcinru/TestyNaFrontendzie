import { Price } from './Price';

export type Product = {
  _id?: string;
  name: string;
  brand: string;
  price: Price[];
};
