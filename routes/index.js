var express = require('express');
var router = express.Router();
var Project = require('../models/project.js')
var marked = require('marked');

router.get('/', function(req, res){
	res.render('home.ejs', {message: req.flash('message'), type: req.flash('type')}) // change to be normal home.ejs
})

router.get('/dashboard', function(req, res){
	console.log(req.user)
	Project.findUser(req.user._id, function(projects){
		res.render('dashboard/home.ejs', {projects: projects, message: req.flash('message')})
	})
})


module.exports = router;