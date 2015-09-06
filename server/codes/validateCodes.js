module.exports = function(app, db) {
    app.post('/api/validateCodes', function(req, res) {
        var codes = db.get('codes');

        codes.find({"text":req.body}, function(err, docs) {
            console.log(err);
            console.log(docs);
            res.send(docs);
        });
    });
};