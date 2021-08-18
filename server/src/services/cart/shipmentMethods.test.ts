import { Currency } from '../../types/Currency';
import { calculateShipmentPrice } from './shipmentMethods';

describe('calculateShipmentPrice', () => {
  it('throws error when there is wrong shipment type', () => {
    const getPrice = () =>
      calculateShipmentPrice('aWrongMethod', 3000, Currency.EUR);
    expect(getPrice).toThrow('Shipment method aWrongMethod not found');
  });

  it('calculates free delivery for standardDelivery - EUR', () => {
    const deliveryPrice = calculateShipmentPrice(
      'standardDelivery',
      5000,
      Currency.EUR,
    );
    expect(deliveryPrice).toBe(0);
  });

  it('calculates delivery cost for standardDelivery - EUR', () => {
    const deliveryPrice = calculateShipmentPrice(
      'standardDelivery',
      3000,
      Currency.EUR,
    );
    expect(deliveryPrice).toBe(221);
  });

  it('calculates delivery cost for expressDelivery - EUR', () => {
    const deliveryPrice = calculateShipmentPrice(
      'expressDelivery',
      3000,
      Currency.EUR,
    );
    expect(deliveryPrice).toBe(552);
  });
});
