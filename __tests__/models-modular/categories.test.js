const model = require('../../models-modular/categories/categories.js');

const supergoose = require('../supergoose.js');

describe('Categories Model (Modular)', () => {

  // How will you handle both the happy path and edge cases in these tests?

  it('can create() a new category', () => {

    let test = { name : 'test1 name', description : 'test1 description' };

    return model.create( test )
      .then( obj => {
        Object.keys( test ).forEach( key => {
          expect( obj[key] === test[key] ).toEqual(true);
        });
      });
  });

  it('can get() a category', () => {

    let test = { name : 'test2 name', description : 'test2 description' };

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

  it('can get() all categories', () => {

    let test1 = { name : 'test1 name', description : 'test1 description' };
    let test2 = { name : 'test2 name', description : 'test2 description' };
    let test3 = { name : 3, description : 3 };

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
      })

  });

  it('can update() a category', () => {

    let test = { name : 'test3 name', description : 'test3 description' };

    return model.get()
      .then( list => {
        let id = list.results[4]._id;
        return model.update( id, test );
      })
      .then( updated => {
        Object.keys( test ).forEach( key => {
          expect(updated[key] === test[key]).toEqual(true);
        });
        return model.get()
      })
      .then( updatedList => {
        Object.keys( test ).forEach( key => {
          expect( updatedList.results[4][key] === test[key] ).toEqual(true);
        })
      });

  });

  it('can delete() a category', () => {

    let test = { name : 'deleteme', description : 'i exist to be deleted :(' };
    
    return model.create( test )
      .then( obj => {
        return model.get( obj._id )
      })
      .then( obj => {
        return model.delete( obj._id )
      })
      .then( () => {
        return model.get();
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
