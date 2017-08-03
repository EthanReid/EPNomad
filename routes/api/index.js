var express = require('express');
var oauth2orize = require('oauth2orize')
var passport = require('passport')
var router = express.Router();

var server = oauth2orize.createServer();

server.exchange(oauth2orize.exchange.clientCredentials(function(client, scope, done) {
	var token = utils.uid(256)
	var tokenHash = crypto.createHash('sha1').update(token).digest('hex')
	var expiresIn = 1800 // available for 30 minutes
	var expirationDate = new Date(new Date().getTime() + (expiresIn * 1000))
	new AccessToken({token: tokenHash, expirationDate: expirationDate, clientId: client._id, scope: scope}).save(function(err) {
		if (err) return done(err)
		return done(null, token, {expires_in: expiresIn})
	})
}))

var token = [
	passport.authenticate(['clientBasic'], { session: false }),
	server.token(),
	server.errorHandler()
]

router.post('/oauth/token', token)

module.exports = router;