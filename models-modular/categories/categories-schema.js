'use strict';

const mongoose = require('mongoose');

const categories = mongoose.Schema({

  name : { 
    type : 'string', 
    required : true },
  description : { 
    type : 'string', 
    required : true }

});


module.exports = mongoose.model('categories ', categories);
