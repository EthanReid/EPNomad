var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../models/user');
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var crypto = require('crypto');
var Project = require('../models/project.js')
var AccessToken = require('../models/accessToken.js')

// expose this function to our app using module.exports
module.exports = function(passport) {
	// oauth2 based off client credential flow (https://github.com/reneweb/oauth2orize_client_credentials_example)
	passport.use("clientBasic", new BasicStrategy(
		function (clientId, clientSecret, done) {
			User.findById(clientId, function (err, client) {
				if (err) return done(err)
				if (!client) return done(null, false)
				if (client.clientSecret === clientSecret) return done(null, client)
				else return done(null, false)
			});
		}
	));

	/**
	 * This strategy is used to authenticate users based on an access token (aka a
	 * bearer token).
	 */
	passport.use("accessToken", new BearerStrategy(
		function (accessToken, done) {
			var accessTokenHash = crypto.createHash('sha1').update(accessToken).digest('hex')
			AccessToken.findOne({token: accessTokenHash}, function (err, token) {
				if (err) return done(err)
				if (!token) return done(null, false)
				if (new Date() > token.expirationDate) {
					AccessToken.remove({token: accessTokenHash}, function (err) { done(err) })
				} else {
					User.findById(token.clientId, function (err, user) {
						if (err) return done(err)
						if (!user) return done(null, false)
						// no use of scopes for no
						var info = { scope: '*' }
						done(null, user, info);
					})
				}
			})
		}
	))

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// used to deserialize the user
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	passport.use('local-signup', new LocalStrategy({
		// by default, local strategy uses username and password, we will override with email
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true // allows us to pass back the entire request to the callback
	},
	function(req, email, password, done) {
		process.nextTick(function() {
		// find a user whose email is the same as the forms email
		// we are checking to see if the user trying to login already exists
		User.findOne({ 'email' :  email }, function(err, user) {
			// if there are any errors, return the error
			if (err)
				return done(err);

			// check to see if theres already a user with that email
			if (user) {
				return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
			} else {

				// if there is no user with that email
				// create the user
				var newUser      = new User();

				// set the user's local credentials
				newUser.name     = req.body.name;
				newUser.email    = email;
				newUser.password = newUser.generateHash(password);

				// save the user
				newUser.save(function(err) {
					if (err)
						throw err;
					return done(null, newUser);
				});
			}

		});    

		});

	}));

	// =========================================================================
	// LOCAL LOGIN =============================================================
	// =========================================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	passport.use('local-login', new LocalStrategy({
		// by default, local strategy uses username and password, we will override with email
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true // allows us to pass back the entire request to the callback
	},
	function(req, email, password, done) { // callback with email and password from our form
		// find a user whose email is the same as the forms email
		// we are checking to see if the user trying to login already exists
		User.findOne({ 'email' :  email }, function(err, user) {
			// if there are any errors, return the error before anything else
			if (err)
				return done(err);
			
			if (!user || !user.validPassword(password))
				return done(null, false, req.flash('signinMessage', 'Wrong username/password')); 

			return done(null, user);
		});
	}));
};