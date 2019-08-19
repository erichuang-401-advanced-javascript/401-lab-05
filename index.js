'use strict';

const mongoose = require('mongoose');

// Require your model
const Categories = require('./models-singular/categories');
let categories = new Categories();

const products = require( './models-modular/products/products' );

// Mongoose Server URI
const MONGOOSE_URI = 'mongodb://localhost:27017/class05';

// Connect
mongoose.connect( MONGOOSE_URI, { useNewUrlParser: true });

// Do some work

categories.create({
  name : 'category singular test name',
  description : 'category singular test description'
})
  .then( console.log )
  .catch( error => console.log(error) );

products.create({
  name : 'product modular test name',
  description : 'product modular test description'
})
  .then( console.log )
  .catch( error => console.log(error) );

// Disconnect
mongoose.disconnect();