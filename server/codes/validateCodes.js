module.exports = function(app, db) {
    app.post('/api/validateCodes', function(req, res) {
        var codes = db.get('codes');

        codes.find(req.body, function(err, docs) {
            console.log(err);
            console.log(docs);

            if (docs.length > 0) {
                // to do, see if at capacity
                res.status(200).send(docs);
            }
            else {
                res.status(401).send({ error: 'Code not found' });
            }

        });
    });
};