module.exports = function (app, db) {
    app.post('/api/registerNinja', function (req, res) {
        var registration = db.get('registration');
        var codes = db.get('codes');

        registration.insert(req.body.form)
            .success(function (doc) {
                console.log(doc);
                console.log('update code');

                // Update code count
                codes.findAndModify({query: {text: req.body.code}, update: {$inc: {current: 1}}}, function (err, docs) {
                    console.log('err', err);
                    console.log('doc', docs);

                    if (err) {
                        res.status(500).send({error: err});
                    }
                    else {
                        res.status(200).send({msg: 'Accepted'});
                    }
                });
            })
            .error(function (err) {
                console.log(err);

                res.status(503).end();
            });
    });
};