'use strict';
var Xray = require('x-ray');
var x = Xray();
var model_url = require('./model_url');
model_url.find({},
  function(error_finding,urls){
    urls.forEach(x(url)(
      function(err, title) {
      console.log(title);
    }));
  });
