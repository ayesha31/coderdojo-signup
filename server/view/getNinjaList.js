var mongodb = require('mongodb').MongoClient;

module.exports = function(app, db) {
	app.get('/api/ninjaList', function(req, res) {
		var registration = db.get('registration');
		
		registration.insert(req.body)
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