'use strict';

// Where is our schema defined?
// How do we get it in here so we can run methods on it?
const schema = require('./categories-schema.js');

class Categories {

  constructor() {}

  /**
   * Uses Mongoose method to get by ID or return a list of database results
   * @param {*} _id 
   */
  get( _id ) {

    if ( _id ){
      return schema.findById( _id );
    } else {
      return schema.find( {} )
        .then( results => {
          return { 
            count : results.length,
            results : results };
        });
    }

  }

  /**
   * Uses Mongoose method to create a new instance in the database.
   * Returns the new record.
   * @param {*} record 
   */
  create( record ) {
    // Call the appropriate mongoose method to create a new record
    let newRecord = new schema( record );
    return newRecord.save();
  }

  /**
   * Uses Mongoose method to update by ID and returns the newly updated item.
   * @param {*} _id 
   * @param {*} update 
   */
  update( _id, update ) {
    // Call the appropriate mongoose method to update a record
    return schema.findByIdAndUpdate( _id, update, { new : true } );
  }

  /**
   * Uses Mongoose method to delete by ID and returns the deleted item.
   * @param {*} _id 
   */
  delete( _id ) {
    // Call the appropriate mongoose method to delete a record
    return schema.findByIdAndDelete( _id );

  }

}

module.exports = Categories;
