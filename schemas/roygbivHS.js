var mongoose = require('mongoose');

module.exports = mongoose.model('HighScore', {
	username: String,
	score: Number,
	done: Boolean
});