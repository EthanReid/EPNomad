var mongoose = require('mongoose');

// define the schema for our user model
var accessTokenSchema = mongoose.Schema({
	token: String,
	expirationDate: Date,
	clientId: String,
	scope: String
});

module.exports = mongoose.model('AccessToken', accessTokenSchema);