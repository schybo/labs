var mongoose = require('mongoose');

mongoose.connect('mongodb://kleptomania:brent0wns@ds033569.mongolab.com:33569/kleptomania');

module.exports = mongoose.connection;