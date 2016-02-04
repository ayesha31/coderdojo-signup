
module.exports = function (app, db) {
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

  app.get('/api/registerNinja', function(req, res) {
    Ninja
      .find({}, function(err, ninjas) {
        var numNinjas = 0;

        for(var i = 0; i < ninjas.length; i++) {
          numNinjas += ninjas[i].ninjas.length;
        }

        if(ninjas) {
          res.status(200).send({number: app.maximumNumberOfNinjas - numNinjas});
        } else if(err) {
          res.status(503).end();
        }
      });
  });

  app.post('/api/registerNinja', function (req, res) {
    var ninja = new Ninja(req.body.form);

    ninja.save(function(err) {
      if(err) {
        res.status(503).end();
        console.log(err);
      }

      res.status(200).send({msg: 'Accepted'});
      });
  });
};
