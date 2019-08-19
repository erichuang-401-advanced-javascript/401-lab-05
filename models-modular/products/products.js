'use strict';

const Model = require( '../mongo');
const schema = require( './products-schema' );

module.exports = new Model ( schema );