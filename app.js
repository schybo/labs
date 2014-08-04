var express      = require('express');
var path         = require('path');
var favicon      = require('static-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var MongoStore   = require('connect-mongo')(session);
var db           = require('./db');

var routes       = require('./routes/index');

var app          = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(session({
    secret: 'jacksonville floor',
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({
      mongoose_connection : db
    })
}));
app.use(function (req, res, next) {
    res.set('X-Powered-By', 'Schybo Labs');
    next();
});
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var Photos = require('./schemas/blur');

//Write to database
app.get("/photo", function(req, res) {
    //Only do this once and copy array then just splice
    Photos.find()
    .exec(function(err, photos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        var n = Math.floor(Math.random() * photos.length)
        res.send(photos[n])
        //add to array of used names double check then get 
        //res.json(photos); // return all photos in JSON format
    });

    /*var strings = ["rad", "bla", "ska"]
    var n = Math.floor(Math.random() * strings.length)
    res.send(strings[n])*/
})

//The database api
require('./routes/klepto_routes.js')(app);

//The blur database api
require('./routes/blur_routes.js')(app);

/// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});*/

module.exports = app;
