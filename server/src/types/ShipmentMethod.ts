import { Price } from './Price';

export interface ShipmentMethod {
  type: string;
  price: Price[];
  freeFrom: Price[];
}
