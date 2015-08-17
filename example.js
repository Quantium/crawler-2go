'use strict';

var Crawler = require('./crawler'),
    Product = require('/Users/marcogodinez/dev/admin-modules/api/warehouse/models/product.js');

var crawler = new Crawler({
  url: 'http://www.bebe2go.com',
  categories: '.navy-main ul li',
  store: true,
  model: Product
});

// Get products
crawler.steal();
