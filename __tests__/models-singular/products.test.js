'use strict';

const Products = require('../../models-singular/products');
const supergoose = require('../supergoose');

describe('Products class can perform get, create, update, and delete functions', () => {

  test('creates a new product', () => {

    let products = new Products();
    let test = { name : 'create test', category : 'create test category', price : 0, available : true };

    return products.create( test )
      .then( obj => {
        Object.keys( test ).forEach( key => {
          expect( obj[key] === test[key] ).toEqual(true);
        });
      });

  });
  
  test('gets one product', () => {

    let products = new Products();
    let test = { name : 'get test', category : 'get test category', price : 0, available : true };

    return products.create( test )
      .then( obj => {
        return products.get( obj._id );
      })
      .then( obj => {
        Object.keys( test ).forEach( key => {
          expect( obj[key] === test[key] ).toEqual(true);
        });
      });

  });

  test('gets all products', () => {

    let products = new Products();
    let test1 = { name : 'getall1 test', category : 'getall1 test category', price : 0, available : true };
    let test2 = { name : 'getall2 test', category : 'getall2 test category', price : 0, available : true };
    let test3 = { name : 'getall3 test', category : 'getall3 test category', price : true, available : 0 };

    return products.create( test1 )
      .then( () => {
        return products.create( test2 )
      })
      .then( () => {
        return products.create( test3 )
      })
      .then( () => {
        return products.get();
      })
      .then( response => {
        expect(response.count === 5).toEqual(true);
      });
    
  });

  test('update a product', () => {

    let products = new Products();
    let test = { name : 'update test', category : 'update test category', price : 0, available : true };

    return products.get()
      .then( response => {
        let id = response.results[4]._id;
        return products.update( id, test );
      })
      .then( updated => {
        Object.keys( test ).forEach( key => {
          expect( updated[key] === test[key] ).toEqual(true);
        });
        return products.get();
      })
      .then( allProducts => {
        Object.keys( test ).forEach( key => {
          expect ( allProducts.results[4][key] === test[key] ).toEqual(true);
        });
      });
  });
  
  test('delete a product', () => {

    let products = new Products();
    let test = { name : 'delete test', category : 'delete test category', price : 99, available : false };
    
    return products.create( test )
      .then( obj => {
        return products.get( obj._id )
      })
      .then( obj => {
        let keys = Object.keys(test);
        keys.forEach( key => {
          expect(obj[key] === test[key]).toEqual(true);
        });
        return products.delete( obj._id )
      })
      .then( () => {
        return products.get();
      })
      .then( allResults => {
        allResults.results.forEach( obj => {
          Object.keys(test).forEach( key => {
            expect(obj[key] === test[key]).toEqual(false);
          });
        });
      });

  });

});