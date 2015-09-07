module.exports = function (app, db) {
    app.delete('/api/deleteCodes', function(req, res) {
        var codes = db.get('codes');

        var testCode1 = {text: 'test', limit: 10, current: 10};
        var testCode2 = {text: 'test', limit: 1000, current: 0};

        codes.remove(testCode1)
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