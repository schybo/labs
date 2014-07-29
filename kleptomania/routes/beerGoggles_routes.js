var Photos = require('../schemas/beerGoggles');

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all photo names
	app.get('/api/photos', function(req, res) {

		// use mongoose to get all photo names in the database
		Photos.find()
		.exec(function(err, photos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(photos); // return all photos in JSON format
		});
	});

	// create highscore and send back all photos after creation
	app.post('/api/photos', function(req, res) {

		// create a highscore, information comes from AJAX request from Angular
		Photos.create({
			username : req.body.username,
			score : req.body.score,
			done : false
		}, function(err, photo) {
			if (err)
				res.send(err);

			// get and return all the photoss after you create another
			Photos.find(function(err, photos) {
				if (err)
					res.send(err)
				res.json(photos);
			});
		});

	});

	// delete a highscore
	app.delete('/api/photos/:highscore_id', function(req, res) {
		Photos.remove({
			_id : req.params.highscore_id
		}, function(err, photo) {
			if (err)
				res.send(err);

			// get and return all the photos after you create another
			Photos.find(function(err, photos) {
				if (err)
					res.send(err)
				res.json(photos);
			});
		});
	});
};