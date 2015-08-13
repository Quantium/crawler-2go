'use strict';

var   mongoose      = require('./mongoose');
var   schema ;
  schema =  new  mongoose.Schema({
      url : String
});
// Template Model
module.exports = mongoose.model('url', schema);
