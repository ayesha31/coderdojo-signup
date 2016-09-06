module.exports = function(app, db) {
  'use strict';
  
  var ninjaSchema = db.Schema({
    ninjas: [
        {
          firstName: String,
          lastName: String,
          dateOfBirth: Date,
          under12: Boolean,
        }
    ],
    activities: [
      
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
        phone: String,
        isBwEmployee: Boolean
    },
    photoPermission: Boolean,
    comments: String
  });
  
  var Ninja = db.model('Ninja', ninjaSchema);

  app.get('/api/ninja?', function(req, res) {
    if(req.query.passcode) {
      var result = checkPasscode(req.query.passcode);

      if(result === 'external') {
        getNumberOfNinjas(true).then(function(num) {
            res.status(200).send({
              passcodeSuccessful: true,
              isExternal: true,
              passcodeRequired: app.passcodeRequired,
              externalPlacesRemaining: app.maxNonBwNinjas - num
            });
          }, function(err) {
            res.status(503).end();
          });
      } else if(result === 'bankwest') {
        getNumberOfNinjas(false).then(function(num) {
          res.status(200).send({
            passcodeSuccessful: true,
            isExternal: false,
            passcodeRequired: app.passcodeRequired,
            bwPlacesRemaining: app.maxBwNinjas - num
          });
        }, function(err) {
          res.status(503).end();
        });
      } else {
        res.status(200).send({
          passcodeSuccessful: false
        });
      }
    } else {
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
    }
  });
  
  app.post('/api/ninja', function(req, res) {
    var ninja = new Ninja(req.body.data);

    ninja.save(function(err) {
      if(err) {
        res.status(503).end();
        console.log(err);
      }

      res.status(200).send({msg: 'Accepted'});
    });
  });

  function checkPasscode(code) {
    if(code === app.externalPasscode) {
      return 'external';
    } else if (code === app.bwPasscode) {
      return 'bankwest';
    }
    return null;
  }

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
};