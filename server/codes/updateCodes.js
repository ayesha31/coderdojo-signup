module.exports = function (app, db) {
    app.put('/api/updateCodes', function (req, res) {
        var codes = db.get('codes');

        console.log('In Update codes');
        codes.findAndModify({query: req.body, update: {$inc: {current: 1}}}, function (err, docs) {
            console.log('err', err);
            console.log('doc', docs);

            res.status(200).send({msg: 'Sending back'});
        });
    });
};