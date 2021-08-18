import { Application } from '../declarations';
import users from './users/users.service';
import products from './products/products.service';
import comments from './comments/comments.service';
import cart from './cart/cart.service';

export default function (app: Application): void {
  app.configure(users);
  app.configure(products);
  app.configure(comments);
  app.configure(cart);
}
