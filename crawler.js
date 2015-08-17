'use strict';

require('colors');

var xray = require('x-ray');
var x = xray();

var Crawler = function (params) {
  params = params || {};

  this.collections = [];
  this.products = [];
  this.result = [];
  this.url = params.url;
  this.categories = params.categories;
};

Crawler.prototype.steal = function (callback) {
  x(this.url, this.categories, [{
    title: 'a',
    url: 'a@href',
  }])(function(err, collections) {
    if (err) { return console.log(err.toString().red); }

    this.collections = collections || [];
    this._collect(0, callback);
  }.bind(this));
};

Crawler.prototype._collect = function (index, callback) {
  index = index || 0;
  var collection = this.collections[index];

  if (collection) {
    return x(collection.url, '.shopping-item', [{
      title: '.productTitle',
      url: 'a.productTitle@href'
    }])(function (err, products) {
      if (err) { return console.log(err.toString().red); }

      console.log('Retrieving collection:'.cyan, collection.title.yellow);
      if (products && products.length) {
        for (var i = 0; i < products.length; i++) {
          products[i].category = collection.title;
          this.products.push(products[i]);
        }
      }
      this._collect(index + 1, callback);
    }.bind(this));
  }

  console.log('================================'.white);
  console.log('================================'.white);
  console.log('================================'.white);

  this._products(0, callback);
};

Crawler.prototype._products = function (index, callback) {
  index = index || 0;
  var product = this.products[index];
  if (product) {
    return x(product.url, '.shopping-content', [{
      display_name: 'h4',
      price: 'p.price',
      images: ['img@src'],
      description: '.product-desc #tab1 h3',
      short_description: '.product-desc #tab1 p'
    }])(function (err, _product) {
      _product = _product[0];

      if (err) { return console.log(err.toString().red); }
      console.log('Retrieving product:'.cyan, product.title.yellow);
      if (_product) {
        _product.category = product.category;
        this.result.push(_product);

        if (!!this.store && this.model) {
          this.model.createAsync(_product)
            .then(function () {
              console.log(('Product has been saved' + product._id).green);
            })
            .catch(function (e) {
              console.log('Error'.red, e);
            });
        }
      }
      this._products(index + 1, callback);
    }.bind(this));
  }

  callback(this.result);
};

module.exports = Crawler;
