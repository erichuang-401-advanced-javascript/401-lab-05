'use strict';

const Categories = require('../../models-singular/categories.js');
const supergoose = require('../supergoose.js');

describe('Categories Model (Singular)', () => {

  // How will you handle both the happy path and edge cases in these tests?

  it('can create() a new category', () => {

    let categories = new Categories();

    let test = { name : 'test name', description : 'test description' };
    return categories.create( test )
      .then( obj => {
        Object.keys( test ).forEach( key => {
          expect( obj[key] === test[key] ).toEqual(true);
        });
      });
  });

  it('can get() a category', () => {

    let categories = new Categories();

    let test = { name : 'test name', description : 'test description' };
    return categories.create( test )
      .then( obj => {
        return categories.get( obj._id );
      })
      .then( obj => {
        Object.keys( test ).forEach( key => {
          expect( obj[key] === test[key] ).toEqual(true);
        });
      });

  });

  it('can get() all categories', () => {

    let categories = new Categories();

    let test1 = { name : 'test1 name', description : 'test1 description' };
    let test2 = { name : 'test2 name', description : 'test2 description' };
    let test3 = { name : 'test3 name', description : 'test3 description' };

    return categories.create( test1 )
      .then( () => {
        return categories.create( test2 )
      })
      .then( () => {
        return categories.create( test3 )
      })
      .then( () => {
        return categories.get();
      })
      .then( response => {
        expect(response.count === 5).toEqual(true);
      })

  });

  it('can update() a category', () => {

    let categories = new Categories();
    let test = { name : 'test1', description : 'test1' };

    return categories.get()
      .then( response => {
        let id = response.results[0]._id;
        return categories.update( id, test );
      })
      .then( updated => {
        Object.keys( test ).forEach( key => {
          expect(updated[key] === test[key]).toEqual(true);
        });
      });
  });

  it('can delete() a category', () => {

    let categories = new Categories();
    let test = { name : 'deleteme', description : 'i exist to be deleted :(' };
    
    return categories.create( test )
      .then( obj => {
        return categories.get( obj._id )
      })
      .then( obj => {
        Object.keys( test ).forEach( key => {
          expect(obj[key] === test[key]).toEqual(true);
        });
        return categories.delete( obj._id )
      })
      .then( () => {
        return categories.get();
      })
      .then( allResults => {
        allResults.results.forEach( obj => {
          Object.keys( test ).forEach( key => {
            expect(obj[key] === test[key]).toEqual(false);
          });
        });
      });
  });

});