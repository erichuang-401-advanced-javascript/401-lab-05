'use strict';

const productsSchema = require('./products-schema');

class Products {

  constructor (){}
  
  /**
   * Uses Mongoose method to get by ID or return a list of database results
   * @param {*} _id 
   */
  get( _id ) {

    if ( _id ){
      return productsSchema.findById( _id );
    } else {
      return productsSchema.find( {} )
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
    let newRecord = new productsSchema( record );
    return newRecord.save();
  }

  /**
   * Uses Mongoose method to update by ID and returns the newly updated item.
   * @param {*} _id 
   * @param {*} update 
   */
  update( _id, update ) {
    // Call the appropriate mongoose method to update a record
    return productsSchema.findByIdAndUpdate( _id, update, { new : true } );
  }

  /**
   * Uses Mongoose method to delete by ID and returns the deleted item.
   * @param {*} _id 
   */
  delete( _id ) {
    // Call the appropriate mongoose method to delete a record
    return productsSchema.findByIdAndDelete( _id );
  }

}

module.exports = Products;