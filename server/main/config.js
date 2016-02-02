var express     = require('express');
var bodyParser  = require('body-parser');
var middle      = require('./middleware');

/*
 * Global env variables
*/
module.exports = function (app, express) {
  app.set('port', process.env.PORT || 5000);
  app.set('base url', process.env.URL || 'http://localhost');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(middle.cors);
  app.use(express.static('./dist'));
  app.use(middle.logError);
  app.use(middle.handleError);

  app.maximumNumberOfNinjas = 30;
};
