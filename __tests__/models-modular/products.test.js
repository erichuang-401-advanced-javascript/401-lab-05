'use strict';

const model = require( '../../models-modular/products/products' );
const supergoose = require( '../supergoose' );

describe('Products class can perform get, create, update, and delete functions', () => {

  test('creates a new product', () => {

    let test = { name : 'create test', category : 'create test category', price : 0, available : true };

    return model.create( test )
      .then( obj => {
        Object.keys( test ).forEach( key => {
          expect( obj[key] === test[key] ).toEqual(true);
        });
      });

  });
  
  test('gets one product', () => {

    let test = { name : 'get test', category : 'get test category', price : 0, available : true };

    return model.create( test )
      .then( obj => {
        return model.get( obj._id );
      })
      .then( obj => {
        Object.keys( test ).forEach( key => {
          expect( obj[key] === test[key] ).toEqual(true);
        });
      });

  });

  test('gets all products', () => {

    let test1 = { name : 'getall1 test', category : 'getall1 test category', price : 0, available : true };
    let test2 = { name : 'getall2 test', category : 'getall2 test category', price : 0, available : true };
    let test3 = { name : 'getall3 test', category : 'getall3 test category', price : true, available : 0 };

    return model.create( test1 )
      .then( () => {
        return model.create( test2 )
      })
      .then( () => {
        return model.create( test3 )
      })
      .then( () => {
        return model.get();
      })
      .then( response => {
        expect(response.count === 5).toEqual(true);
      });
    
  });

  test('update a product', () => {

    let test = { name : 'update test', category : 'update test category', price : 0, available : true };

    return model.get()
      .then( response => {
        let id = response.results[4]._id;
        return model.update( id, test );
      })
      .then( updated => {
        Object.keys( test ).forEach( key => {
          expect( updated[key] === test[key] ).toEqual(true);
        });
        return model.get();
      })
      .then( allProducts => {
        Object.keys( test ).forEach( key => {
          expect ( allProducts.results[4][key] === test[key] ).toEqual(true);
        });
      });
  });
  
  test('delete a product', () => {

    let test = { name : 'delete test', category : 'delete test category', price : 99, available : false };
    
    return model.create( test )
      .then( obj => {
        return model.get( obj._id )
      })
      .then( obj => {
        let keys = Object.keys(test);
        keys.forEach( key => {
          expect(obj[key] === test[key]).toEqual(true);
        });
        return model.delete( obj._id )
      })
      .then( () => {
        return model.get();
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
