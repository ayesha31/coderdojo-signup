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
  app.use(express.static(__dirname + '/dist'));
  app.use(middle.logError);
  app.use(middle.handleError);

  app.maximumNumberOfNinjas = process.env.MAX_NINJAS || 30;
  app.passcodeRequired = process.env.PASSCODE_REQUIRED || true;
  app.maxBwNinjas = process.env.MAX_BW_NINJAS || 15;
  app.maxNonBwNinjas = process.env.MAX_NON_BW_NINJAS || 15;
  app.bwPasscode = process.env.BW_PASSCODE || 'bankwest';
  app.externalPasscode = process.env.EXTERNAL_PASSCODE || 'external';
};
