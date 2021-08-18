'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const getProducts = require('../src/mockData/getProducts');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const feathers = require('@feathersjs/feathers');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const configuration = require('@feathersjs/configuration');
const app = feathers().configure(configuration());
const url = app.get('mongodb');

module.exports.up = next => {
  let mClient = null;
  return MongoClient.connect(url)
    .then(client => {
      mClient = client;
      return client.db();
    })
    .then(async (db) => {
      const Product = db.collection('products');
      const products = getProducts();
      await Product.insertMany(products);
      return Product;
    })
    .then(() => {
      mClient.close();
      return next();
    })
    .catch(err => next(err));
};

module.exports.down = next => {
  let mClient = null;
  return MongoClient
    .connect(url)
    .then(client => {
      mClient = client;
      return client.db();
    })
    .then(async(db) => {
      const products = getProducts();
      await db.collection('products').deleteMany(products);
    })
    .then(() => {
      mClient.close();
      return next();
    })
    .catch(err => next(err));

};
