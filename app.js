
/**
 * Module dependencies.
 */

module.exports = function (flights, db) {
	var express = require('express');
	var MongoStore = require('connect-mongo')(express);
	var passport = require('./auth');
	var routes = require('./routes')(flights);
	var path = require('path');	
	var lessMiddleware = require('less-middleware');
	var app = express();

	// all environments
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	//app.engine('html', require('ejs').renderFile);	// add support for EJS templates in .html files
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.cookieParser());
	app.use(express.session({
		secret: 'keyboard cat',
		store: new MongoStore({
			mongoose_connection: db
		})
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(function (req, res, next) {
		res.set('X-Powered-By', 'Kleptomania');
		next();
	});
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));

	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}

	// serve up CSS compiled from LESS
	var lessOptions =
		{ // production LESS options
			once         : true,
			optimization : 2,
			compress     : true
		}
	;
	app.use('/css', lessMiddleware(__dirname + '/public/assets/css', lessOptions));

	app.get('/flight/:number', routes.flight);
	app.put('/flight/:number/arrived', routes.arrived);
	app.get('/list', routes.list);
	app.get('/arrivals', routes.arrivals);
	app.get('/highscore', routes.highScore);

	app.get('/login', routes.login);
	app.post('/login', passport.authenticate('local', {
		failureRedirect: '/login',
		successRedirect: '/user'
	}));

	app.get('/user', routes.user);

	// for serving up css assets
	app.use('/css', express.static(path.resolve("public/assets/css")));
	// for serving up font assets
	app.use('/fonts', express.static(path.resolve('public/assets/fonts')));
	// for serving up images assets
	app.use('/images', express.static(path.resolve('public/assets/images')));
	// for serving up javascript assets
	app.use('/javascripts', express.static(path.resolve('public/assets/javascripts')));
	// for serving up sound assets
	app.use('/sounds', express.static(path.resolve('public/assets/sounds')));
	// for serving up sound assets

	//Do different routing when you have different versions
	//app.get('/roygbiv-v1', routes.roygbiv1);
	app.get('/', routes.index);
	app.get('/beergoggles', routes.beerGoggles);

	//Write to database
	app.get("/string", function(req, res) {
		var strings = ["rad", "bla", "ska"]
		var n = Math.floor(Math.random() * strings.length)
		res.send(strings[n])
	})

	/*app.get('*', function(req, res) {
		res.render('/index');
	})*/

	/*app.use(function(req, res, next){
	  res.status(404);

	  // respond with html page
	  if (req.accepts('html')) {
	    res.render('404', { url: req.url });
	    return;
	  }

	  // respond with json
	  if (req.accepts('json')) {
	    res.send({ error: 'Not found' });
	    return;
	  }

	  // default to plain-text. send()
	  res.type('txt').send('Not found');
	});*/

	return app;
}


