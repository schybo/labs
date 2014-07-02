
/*
 * GET home page.
 */

var FlightSchema = require('../schemas/flight');
var HighScoreSchema = require('../schemas/kleptomania');

module.exports = function (flights) {
	var flight = require('../flight');

	for(var number in flights) {
		flights[number] = flight(flights[number]);
	}

	var functions = {};

	functions.flight = function(req, res){
		var number = req.param('number');

		req.session.lastNumber = number;

		if (typeof flights[number] === 'undefined') {
			res.status(404).json({status: 'error'});
		} else {
			res.json(flights[number].getInformation());
		}
	};

	functions.arrived = function (req, res) {
		var number = req.param('number');

		if (typeof flights[number] === 'undefined') {
			res.status(404).json({status: 'error'});
		} else {
			flights[number].triggerArrive();

			var record = new FlightSchema(
				flights[number].getInformation()
			);

			record.save(function(err) {
				if (err) {
					console.log(err);
					res.status(500).json({status: 'failure'});
				} else {
					res.json({status: 'success'});
				}
			});

			res.json({status: 'done'});
		}
	};

	functions.list = function (req, res) {
		res.render('list', {
			title: 'All Flights', 
			flights: flights});
	};

	functions.arrivals = function(req, res) {
		FlightSchema.find()
		.setOptions({sort: 'actualArrive'})
		.exec(function(err, arrivals) {
			if (err) {
				res.status(500).json({status: 'failure'});
			} else {
				res.render('arrivals', {
					title: 'Arrivals',
					arrivals: arrivals,
					lastNumber: req.session.lastNumber
				});
			}
		});
	};

	functions.login = function(req, res) {
		res.render('login', {title: 'Log in'});
	};

	function addHighScore(username, score) {
		var record = new HighScoreSchema(
			{
				"username": username,
				"score": score
			}
		);

		record.save(function(err) {});
	}

	functions.index = function(req, res) {
		/*var record = new HighScoreSchema(
			{
				"username": 'Falcon',
				"score": 300
			}
		);

		record.save(function(err) {
			if (err) {
				console.log(err);
				res.status(500).json({status: 'failure'});
			} else {
				res.json({status: 'success'});
			}
		});

		res.json({status: 'done'});*/
		//addHighScore('John', 300);

		HighScoreSchema.find()
		.sort({score:-1})
		.limit(5)
		//.setOptions({sort: 'score'})
		.exec(function(err, highScore) {
			if (err) {
				res.status(500).json({status: 'failure'});
			} else {
				res.render('index', {
					title: 'Kleptomania',
					highScore: highScore
				});
			}
		});
	};

	functions.beerGoggles = function(req, res) {
		res.render('beerGoggles', {
			title: 'Beer Goggles'
		});
	};

	functions.todo = function(req, res) {
		res.render('todo', {
			title: 'todo'
		});
	};

	functions.highScore = function(req, res) {
		HighScoreSchema.find()
		.sort({score:-1})
		//.limit(5)
		//.setOptions({sort: 'score'})
		.exec(function(err, highScore) {
			if (err) {
				res.status(500).json({status: 'failure'});
			} else {
				res.render('highScore', {
					title: 'High Scores',
					highScore: highScore
				});
			}
		});
	};

	functions.user = function(req, res) {
		if (req.session.passport.user === undefined) {
			res.redirect('/login');
		} else {
			res.render('user', {title: 'Welcome!',
				user: req.user
			})
		}
	};

	return functions;
};
