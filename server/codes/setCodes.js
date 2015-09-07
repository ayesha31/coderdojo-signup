module.exports = function (app, db) {
    app.post('/api/setCodes', function(req, res) {
        var codes = db.get('codes');

        var testCode = {text: 'test', limit: 1000, current: 0};

        codes.insert(testCode)
            .success(function(doc) {
                console.log(doc);

                res.status(200).end();
            })
            .error(function(err) {
                console.log(err);

                res.status(503).end();
            });

    });
};