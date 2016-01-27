module.exports = function(app, db) {
    app.post('/api/validateCodes', function(req, res) {
        var codes = db.get('codes');

        codes.find(req.body, function(err, docs) {
            console.log(err);
            console.log(docs);

            if (docs.length ===1 ) {
                var code = docs[0];
                var spotsLeft = code.limit - code.current;
                if (spotsLeft > 0) {
                    res.status(202).send({ code: code.text, spotsLeft: spotsLeft });
                }
                else {
                    res.status(403).send({ error: 'Reached capacity for code ' + code.text });
                }
            }
            else if (docs.length > 1) {
                res.status(500).send({ error: 'Duplicate code error' });
            }
            else {
                res.status(401).send({ error: 'Code not found' });
            }

        });
    });
};