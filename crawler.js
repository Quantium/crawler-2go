'use strict';
var Crawler = require('simplecrawler');
var model_url = require('./model_url');

var myCrawler = new Crawler('www.bebe2go.com', '/');
myCrawler.on('fetchcomplete', function(queueItem, responseBuffer, response) {
    model_url.create({url :  queueItem.url });
    // Do something with the data in responseBuffer
});
myCrawler.maxDepth = 3;
myCrawler.start();
