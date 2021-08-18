import { Currency } from './Currency';
import { ShipmentMethod } from './ShipmentMethod';

export interface Address {
  firstName: string;
  lastName: string;
  street: string;
  postalCode: string;
  city: string;
}
export interface CartData {
  products: string[];
  address: Address;
  currency: Currency;
  shipmentMethod: ShipmentMethod['type'];
}
