import { Application } from '../../declarations';
import { Service, MongoDBServiceOptions } from 'feathers-mongodb';
import { Db } from 'mongodb';

export class Comments extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongoDBServiceOptions>, app: Application) {
    super(options);

    const client: Promise<Db> = app.get('mongoClient');

    client.then((db) => {
      this.Model = db.collection<Comment>('Comments');
    });
  }
}
