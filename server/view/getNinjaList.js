module.exports = function(app, db) {
	app.get('/api/ninjaList', function(req, res) {
		var registration = db.get('registration');

		registration.find({}, {sort: { name: 1 }, fields: {name: 1, email: 1, ninjaInformation: 1} }, function(err, docs) {
			res.send(docs);
		});
	});
};