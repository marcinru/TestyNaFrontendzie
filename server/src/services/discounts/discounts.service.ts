// Initializes the `discounts` service on path `/discounts`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Discounts } from './discounts.class';
import hooks from './discounts.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'discounts': Discounts & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/discounts', new Discounts(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('discounts');

  service.hooks(hooks);
}
