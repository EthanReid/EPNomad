var express = require('express');
var router = express.Router();
var multer = require('multer');
var Project = require('../models/project.js')
var spawn = require('child_process').spawn
var ObjectId = require('mongoose').Types.ObjectId
var crypto = require('crypto')

var yoloStorage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, './tmp/')
	},
	filename: function(req, file, cb){
		crypto.pseudoRandomBytes(16, function (err, raw) {
			cb(null, raw.toString('hex') + Date.now() + '.jpg')
		})
	}
})

var zipStorage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, './darknet_user_files/zips')
	},
	filename: function(req, file, cb){
		crypto.pseudoRandomBytes(16, function (err, raw) {
			cb(null, raw.toString('hex') + Date.now() + '.zip')
		})
	}
})

var yolo = multer({storage: yoloStorage})

var zip = multer({storage: zipStorage })

router.post('/', isLoggedIn, function(req,res){
	Project.addProject(req.body, req.user._id, function(project){
		res.redirect('/projects/' + project._id)
	})
})

// in case ur project gets pwned
router.post('/:project_id/generate_secret', function(req, res){
	Project.regenerateSecret(req.params["project_id"], function(project){
		res.json(project)
	})
})

router.post('/:project_id/delete', isCorrectUser, function(req, res){
	Project.removeProject(req.params["project_id"], function(result){
		res.json(result)
	})
})

router.post('/:project_id/models/add', isCorrectUser, zip.single("file"), function(req, res){
	Project.addModel(req.params["project_id"], req.file, req.body.name, req.body.image_url, req.body.store_url, req.body.price, function(project){
		res.json(project)
	})
})

router.post('/:project_id/models/remove', isCorrectUser, function(req, res){
	Project.removeModel(req.params["project_id"], req.body._id, function(project){
		res.json(project)
	})
})

router.get('/:project_id', isCorrectUser, function(req, res){
	Project.findUser(req.user._id, function(projects){
		res.render("dashboard/project.ejs", { projects: projects, project: res.locals.project })
	})
})

router.post('/:project_id/train', isCorrectUser, function(req, res){
	var id = req.params["project_id"]
	Project.findById(id, function(err, project){

		if(!project.in_training){
			// exec("kill $(ps aux | grep " + id + " | awk \'{print $2}\')") // kills preloaded darknet to free up gpu memory
			Project.findByIdAndUpdate({_id: new ObjectId(id)}, { in_training: true, trained: false }, function(err, project){
				var sp = spawn("python", ["test.py", id])
				var s = spawn("python", ["bg/generate.py", id])
				res.json({"success": true })
			})
		} else {
			res.json({"err": "already training"})
		}
	})
})

router.get('/:project_id/train/is_trained', isCorrectUser, function(req, res){
	Project.findById(req.params["project_id"], function(err, project){
		res.json({trained: project.trained, in_training: project.in_training })
	})
})

// lets get the ctc by having them go to this url then going to the next thing
router.get('/success/:project_id/:site_url', isValidId, function(req, res){
	var id = req.params["project_id"]
	Project.findById(id, function(err, project){
		var clicks = project.clicks
		Project.findByIdAndUpdate({ _id: new ObjectId(id)}, { clicks: clicks++ }, function(err, project){ // increment clicks by one
			if(err) throw err
			res.redirect(site_url)
		})
	})
})

// slow but works
router.post('/:project_id/detect', isValidId, yolo.single('file'), function(req, res){
	if(req.file !== undefined){
		var id = req.params["project_id"] 
		Project.findById(id, function(err, project){
			if(project.trained){
				var cmd = "./darknet detector test ./darknet_user_files/" + id + "/cfg/yolo.data " +
					  "./darknet_user_files/" + id + "/cfg/yolo.cfg " +
					  "./darknet_user_files/" + id + "/weights/yolo_final.weights " + 
					  "./tmp/" + req.file.filename
				exec(cmd, function callback(error, stdout, stderr){
					exec("rm ./tmp/" + req.file.filename, function(err, s, e){ // delet
						res.json({ result: stdout })
					})
				})
			} else {
				res.json({"err": "your model is not trained yet"})
			}
		})
	}
})

// this method will only work with one object so far, we need multiple gpus to have multiple weights preloaded
router.post('/:project_id/detect_fast', isValidId, yolo.single('file'), function(req, res){
	if(req.file !== undefined){
		var id = req.params["project_id"] 
		Project.findById(id, function(err, project){
			if(project.trained){
				fs.appendFile('recognize.txt', req.file.path, function (err) {
					var watcher = fs.watch('./tmp', (eventType, filename) => {
						if(eventType==="rename"&&filename===req.file.filename + ".txt"){ // if its the right file
							fs.readFile("./tmp/" + filename, "utf-8", function(err, data){ // get outputs
								if(err) throw err
								res.json({"success": data})
								watcher.close()
							})
						}
					})
				})
			} else {
				res.json({"err": "your model is not trained yet"})
			}
		})
	}
})

function isValidId(req, res, next){
	if(!ObjectId.isValid(req.params["project_id"])) {
		var err = new Error('Not Found');
		err.status = 404;
		return next(err);
	} 
	return next()
}

function generate404(req,res,next){
	var err = new Error('Not Found');
	err.status = 404;
	return next(err);
}

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	req.flash('message', 'Please sign in to continue')
	res.redirect('/signin');
}

function isCorrectUser(req, res, next){
	if(req.isAuthenticated()){
		res.locals.user_id = req.user._id
		Project.findById(req.params["project_id"], function(err, project){
			if(!project) return generate404(req,res,next)
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

	req.flash('message', 'You\'re already signed in')
	req.flash('type', 'info')
	res.redirect('/')
}

// THIS PART IS FOR BILLING AND PAYMENTS AND SUBS 

function print(input) {
	console.log(input)
}

var stripe = require("stripe")(
  "sk_test_A6WheF3ZTPhWTRtSD8VPQTQy"
);

router.get('/billing', function(req, res){
	if (typeof req.user.stripeID == 'undefined') {
		res.render('subs.ejs')
	} else {
		res.render('unsub.js')
	}
	
})

router.post('/billing/subscribe', (req, res) => {

	var customer = stripe.customers.create({
		email: req.body.stripeEmail,
		source: req.body.stripeToken,
	}, function(err, customer) {
		if (err) {
			print(err)
		} else {
			req.user.stripeID = customer.id
			stripe.subscriptions.create({
			 	customer: customer.id,
				plan: "nomadAPI",
			}, function(err, subscription) {
				if (err) {
					print(err)
					var resp = "fail"
					res.redirect('/dashboard')
				} else {
					print(subscription)
					req.user.subID = subscription.id
					var resp = "wow"
					res.redirect('/dashboard')
				}
			  // asynchronously called
			});

			print(customer.id)
		}
	});
});

router.post('/billing/unsubscribe', (req, res) => {
	stripe.subscriptions.del(
		req.user.subID,
		function(err, confirmation) {
			if (err) {
				res.redirect('/dashboard')
			} else {
				delete req.user.stripeID
				delete req.user.subID
				res.redirect('/dashboard')
			}
		}
	);
})


module.exports = router;