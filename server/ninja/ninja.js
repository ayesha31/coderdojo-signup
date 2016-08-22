module.exports = function(app, db) {
  'use strict';
  
  var ninjaSchema = db.Schema({
    ninjas: [
        {
          firstName: String,
          lastName: String,
          birthday: Date,
          under12: Boolean,
          activities: [
            {
              name: String,
              selected: Boolean
            }
          ]
        }
    ],
    isExternal: Boolean,
    bwContact: {
      firstName: String,
      lastName: String
    },
    parent: {
        firstName: String,
        lastName: String,
        email: String,
        phone: String
    },
    photoPermission: Boolean,
    comments: String
  });
  
  var Ninja = db.model('Ninja', ninjaSchema);

  app.get('/api/ninja', function(req, res) {
    if(app.passcodeRequired) {
      Promise
        .all([getNumberOfNinjas(true), getNumberOfNinjas(false)])
        .then(function(values) {
          res.status(200).send({
          passcodeRequired: app.passcodeRequired,
          bwPlacesRemaining: app.maxBwNinjas - values[1],
          externalPlacesRemaining: app.maxNonBwNinjas - values[0]
        });
        }, function(err) {
          res.status(503).end();
        });
    } else {
      getNumberOfNinjas(false).then(function(num) {
        res.status(200).send({
          passcodeRequired: app.passcodeRequired,
          bwPlacesRemaining: app.maxBwNinjas - num
        });
      }, function(err) {
        res.status(503).end();
      });
    }
  });
  
  app.post('/api/ninja', function(req, res) {
    // use this for checking passcode
    res.status(401).end();
  });

  function getNumberOfNinjas(isExternal) {
    return new Promise(function(resolve, reject) {
      Ninja.find({isExternal: isExternal}, function(err, ninjas) {
        if(err) {
          reject(err);
        }
        var numNinjas = 0;
        for(var i = 0; i < ninjas.length; i++) {
          numNinjas += ninjas[i].ninjas.length;
        }   
        resolve(numNinjas);   
      });
    });
  }
}