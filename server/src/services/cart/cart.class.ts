import { Application } from '../../declarations';
import { Service, MongoDBServiceOptions } from 'feathers-mongodb';
import { Db, ObjectId } from 'mongodb';
import Stripe from 'stripe';
import { CartData } from '../../types/Cart';
import { Product } from '../../types/Product';
import { calculateShipmentPrice, shipmentMethods } from './shipmentMethods';

if (process.env.STRIPE_SECRET == null) {
  throw new Error('Stripe is not configured');
}

const stripe = new Stripe(process.env.STRIPE_SECRET, {
  apiVersion: '2020-08-27',
});

export class Cart extends Service {
  client: Promise<Db>;
  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    this.client = app.get('mongoClient');
  }
  async create(data: CartData) {
    const db = await this.client;

    const productIds = data.products.map((product) => new ObjectId(product));
    const products = await db
      .collection<Product>('Products')
      .aggregate([{ $match: { _id: { $in: productIds } } }])
      .toArray();

    const price = products.reduce((sum, elem) => {
      const priceInCurrency = elem.price.find(
        (item) => item.currency === data.currency,
      );
      sum += priceInCurrency ? priceInCurrency.price : 0;
      return sum;
    }, 0);

    const shipmentPrice = calculateShipmentPrice(
      data.shipmentMethod,
      price,
      data.currency,
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: price + shipmentPrice,
      currency: data.currency,
    });

    return { clientSecret: paymentIntent.client_secret };
  }
}
