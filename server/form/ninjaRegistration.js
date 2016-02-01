

module.exports = function (app, db) {
  app.get('/api/registerNinja', function(req, res) {
    var registration = db.get('registration');

    registration.find({}, {}, function(err, docs) {
      if(docs) {
        res.status(200).send({number: app.maximumNumberOfNinjas - docs.length});
      } else if(err) {
        res.status(503).end();
      }
    });
  });

  app.post('/api/registerNinja', function (req, res) {
    var registration = db.get('registration');

    registration.insert(req.body.form)
        .success(function (doc) {
          console.log(doc);

          res.status(200).send({msg: 'Accepted'});
        })
        .error(function (err) {
            console.log(err);

            res.status(503).end();
        });
    });
};
