'use strict';
var rc = require('rc') ;

module.exports = rc('core', {
  mongo: { url: 'mongodb://localhost:27017/core'},
  aws: {
      access_key_id     : '',
      secret_access_key : '',
      sqs_url           : 'https://sqs.us-east-1.amazonaws.com/XXXXXXXXXXXXXX/test'
},
  socket: {
    host  : 'localhost',
    port  : 8080,
    key   : './keys/server-key.pem',
    cert  : './keys/server-cert.pem',
    ca    : ['./keys/client-cert.pem']
}
});
