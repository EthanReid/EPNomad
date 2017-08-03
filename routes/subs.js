var express = require('express');
var router = express.Router();
var Project = require('../models/project.js')
var marked = require('marked');


//req.user


router.get('/billing', function(req, res){
	console.log(req.user)
	res.render('subs.ejs', {message: req.flash('message'), type: req.flash('type')})
})

// var customer = stripe.customers.create({
// 	email: "jenny.rosen@example.com",
// }, function(err, customer) {
// 	if (err) {
// 		print(err)
// 	} else {
// 		stripe.subscriptions.create({
// 		 	customer: customer.id,
// 			plan: "nomadAPI",
// 		}, function(err, subscription) {
// 			if (err) {
// 				print(err)
// 			} else {
// 				print(subscription)
// 			}
// 		  // asynchronously called
// 		});

// 		print(customer.id)
// 	}
// });

// function print(input) {
// 	console.log(input)
// };

// stripe.subscriptions.retrieve(
// 	"sub_AHqpku1ywVSpkL",
// 	function(err, subscription) {
// 	// asynchronously called
// 	}
// );

// stripe.subscriptions.update(
//   "sub_AnWhNds6gcUjOg",
//   { plan: "nomadAPI" },
//   function(err, subscription) {
//     // asynchronously called
//   }
// );

// stripe.subscriptions.del(
//   "sub_AnWhNds6gcUjOg",
//   function(err, confirmation) {
//     // asynchronously called
//   }
// );

module.exports = router;