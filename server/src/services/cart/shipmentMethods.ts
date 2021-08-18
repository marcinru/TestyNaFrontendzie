import { Currency } from '../../types/Currency';
import { ShipmentMethod } from '../../types/ShipmentMethod';

export const shipmentMethods: ShipmentMethod[] = [
  {
    type: 'expressDelivery',
    price: [
      {
        currency: Currency.PLN,
        price: 2500,
      },
      {
        currency: Currency.USD,
        price: 669,
      },
      {
        currency: Currency.EUR,
        price: 552,
      },
    ],
    freeFrom: [
      {
        currency: Currency.PLN,
        price: Infinity,
      },
      {
        currency: Currency.USD,
        price: Infinity,
      },
      {
        currency: Currency.EUR,
        price: Infinity,
      },
    ],
  },
  {
    type: 'standardDelivery',
    price: [
      {
        currency: Currency.PLN,
        price: 1000,
      },
      {
        currency: Currency.USD,
        price: 268,
      },
      {
        currency: Currency.EUR,
        price: 221,
      },
    ],
    freeFrom: [
      {
        currency: Currency.PLN,
        price: 20000,
      },
      {
        currency: Currency.USD,
        price: 5500,
      },
      {
        currency: Currency.EUR,
        price: 4500,
      },
    ],
  },
];

export const calculateShipmentPrice = (
  chosenMethod: ShipmentMethod['type'],
  productsPrice: number,
  currency: Currency,
) => {
  const shipmentMethod = shipmentMethods.find(
    (method) => method.type === chosenMethod,
  );

  if (shipmentMethod == null) {
    throw new Error(`Shipment method ${chosenMethod} not found`);
  }

  const shipmentFreeFrom = shipmentMethod.freeFrom.find(
    (currencyPair) => currencyPair.currency === currency,
  );

  const shipmentValue = shipmentMethod.price.find(
    (currencyPair) => currencyPair.currency === currency,
  );

  if (shipmentFreeFrom == null || shipmentValue == null) {
    throw new Error(`Price for ${chosenMethod} in ${currency} not found`);
  }

  const isFree =
    Math.max(productsPrice, shipmentFreeFrom.price) === productsPrice;

  return isFree ? 0 : shipmentValue.price;
};
