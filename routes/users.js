var express = require('express');
var router = express.Router();
var passport = require('passport')
var User = require("../models/user.js")
var ObjectId = require('mongoose').Types.ObjectId

router.get('/signup', preventLogin, function(req, res) {
	res.render('auths/signup', { message: req.flash('signupMessage') });
});

router.post('/signup', preventLogin, passport.authenticate('local-signup', {
	successRedirect : '/dashboard', 
	failureRedirect : '/signup', 
	failureFlash : true 
}));

router.get('/signin', preventLogin, function(req, res){
	res.render('auths/signin', { message: req.flash('signinMessage') })
})

router.post('/signin', preventLogin, passport.authenticate('local-login', {
	successRedirect : '/dashboard', 
	failureRedirect : '/signin', 
	failureFlash : true 
}))

router.get('/signout', function(req, res) {
	req.logout()
	res.redirect('/')
});

router.get('/forgot_password', function(req, res){

})

router.get('/verify/:token', function(req, res){

})

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	req.flash('message', 'Please sign in to continue')
	res.redirect('/signin');
}

function isCorrectUser(req, res, next){
	if(req.isAuthenticated()){
		res.locals.user_id = req.user._id
		Project.findOneProject(req.params["project_id"], function(project){
			if(project.userId === res.locals.user_id.toString()){
			  res.locals.project = project
			  return next()
			} else {
				req.flash('message', 'You\'re not allowed to access this page :P')
				res.redirect('/')
			}
		})
	} else {
	  req.flash('message', 'Please sign in to continue')
	  res.redirect('/signin')
	}
}

function preventLogin(req, res, next) {
	if (!req.isAuthenticated())
		return next()
	
	res.redirect('/dashboard')
}

module.exports = router;
