/*
 * Module depenendcies
 */
var express = require('express');
var db = require('monk')(process.env.DB_URL || 'mongodb://localhost/coderdojo-signup');

/*
 * Application server
 */
var app = express();


require('./config.js')(app, express);

require('../form/ninjaRegistration.js')(app, db);
require('../view/getNinjaList.js')(app, db);

module.exports = app;
