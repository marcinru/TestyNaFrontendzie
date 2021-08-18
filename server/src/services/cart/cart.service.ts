// Initializes the `products` service on path `/products`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Cart } from './cart.class';

export default function (app: Application): void {
  // Initialize our service with any options it requires
  app.use('/cart', new Cart({}, app));
}
