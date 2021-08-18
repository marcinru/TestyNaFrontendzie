import { Price } from "./Price";

export type Product = {
  _id: string;
} & NewProduct;

export type NewProduct = {
  name: { [key: string]: string };
  brand: string;
  price: Price[];
};
