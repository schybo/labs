var HS = require('../schemas/roygbivHS');

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all highscores
	app.get('/api/roygbiv/highscores', function(req, res) {

		// use mongoose to get all highscores in the database
		HS.find()
		.sort({score:-1})
		//.limit(5) //don't want to use because score then not showing up
		.exec(function(err, highscores) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(highscores); // return all highscores in JSON format
		});
	});

	// create highscore and send back all highscores after creation
	app.post('/api/roygbiv/highscores', function(req, res) {

		// create a highscore, information comes from AJAX request from Angular
		HS.create({
			username : req.body.username,
			score : req.body.score,
			done : false
		}, function(err, highscore) {
			if (err)
				res.send(err);

			// get and return all the highscoress after you create another
			HS.find(function(err, highscores) {
				if (err)
					res.send(err)
				res.json(highscores);
			});
		});

	});

	// delete a highscore
	app.delete('/api/roygbiv/highscores/:highscore_id', function(req, res) {
		HS.remove({
			_id : req.params.highscore_id
		}, function(err, highscore) {
			if (err)
				res.send(err);

			// get and return all the highscores after you create another
			HS.find(function(err, highscores) {
				if (err)
					res.send(err)
				res.json(highscores);
			});
		});
	});
};