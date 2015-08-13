'use strict';

var config   = require('./config'),
    mongoose = require('mongoose'),
    P        = require('bluebird');


// Promisify mongoose with Bluebird
P.promisifyAll(mongoose);
// Connect to mongo server
mongoose.connect(config.mongo.url);
// Add the function type to mongoose schema.

module.exports = mongoose;
