# 401-lab-05

### Author: Eric Huang

### Links and Resources
* [submission PR](http://xyz.com)
* [travis](http://xyz.com)
* [front-end](http://xyz.com) (when applicable)

#### Documentation
* [jsdoc](http://xyz.com) (Server assignments)

### Modules
*`products.js`, `catogories.js`
##### Exported Values and Methods
* get()
  /**
   * Uses Mongoose method to get by ID or return a list of database results
   * @param {*} _id 
   */
* create()
  /**
   * Uses Mongoose method to create a new instance in the database.
   * Returns the new record.
   * @param {*} record 
   */
* update()
  /**
   * Uses Mongoose method to update by ID and returns the newly updated item.
   * @param {*} _id 
   * @param {*} update 
   */
* delete()
  /**
   * Uses Mongoose method to delete by ID and returns the deleted item.
   * @param {*} _id 
   */

### Setup
#### `.env` requirements
* `PORT` - Port Number
* `MONGODB_URI` -  'mongodb://localhost:27017/class05'

#### Running the app
* `npm start`
* Endpoint: `/`
  * Create a category testing the singular module and then creates a product testing the modular module and console logs.
  
#### Tests
* How do you run tests?
* What assertions were made?
* What assertions need to be / should be made?

#### UML
Link to an image of the UML for your application and response to events