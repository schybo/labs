var mongoose = require('mongoose');

module.exports = mongoose.model('PhotoNames', {
	name: String,
	option1: String,
	option2: String,
	option3: String,
	hash: String
});