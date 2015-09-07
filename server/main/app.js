/*
 * Module depenendcies
 */
var express = require('express');
var db = require('monk')(process.env.DB_URL || 'mongodb://localhost/coder-dojo-signup');

/*
 * Application server
 */
var app = express();


require('./config.js')(app, express);

require('../form/ninjaRegistration.js')(app, db);
require('../view/getNinjaList.js')(app, db);
require('../codes/validateCodes.js')(app, db);

if (!process.env.PROD) {
    require('../codes/setCodes.js')(app,db);
    require('../codes/deleteCodes.js')(app,db);
}

module.exports = app;