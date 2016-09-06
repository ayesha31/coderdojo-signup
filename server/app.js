var express = require('express');
var mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL || 'mongodb://localhost/coderdojo-signup');

var db = mongoose.connection;

/*
 * Application server
 */
var app = express();
require('./config.js').config(app, express);

db.once('open', function() {
  // require('../form/ninjaRegistration.js')(app, mongoose);
  require('./ninja/ninja.js')(app, mongoose);
});

module.exports = app;