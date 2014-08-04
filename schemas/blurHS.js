var mongoose = require('mongoose');

module.exports = mongoose.model('BlurHighScore', {
	username: String,
	score: Number,
	done: Boolean
});