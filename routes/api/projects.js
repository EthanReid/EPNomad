var express = require('express');
var oauth2orize = require('oauth2orize')
var passport = require('passport')
var router = express.Router();
var multer = require('multer')

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

router.get('/restricted', passport.authenticate('accessToken', { session: false }), function (req, res) {
	res.json({"success": "Yay, you successfully accessed the restricted resource!"})
})

router.post('/:project_id/detect', passport.authenticate('accessToken'), function(req, res){ // take it with b64 encoding
	var base64Data = req.body.base64.replace(/^data:image\/\w+;base64,/, ""); // for ajax requests
	var name = utils.uid(64) // generate random string
	var filename = name + ".jpg"
	var first_filename = filename
	var full_filename = "./tmp/" + filename
	fs.writeFile(full_filename, base64Data, 'base64', function(err) {
		var id = req.params["project_id"] 
		Project.findOneProject(id, function(project){
			if(project.trained){
				var cmd = "./darknet detector test ./darknet_user_files/projects/" + id + "/cfg/yolo.data " +
					  "./darknet_user_files/projects/" + id + "/cfg/yolo.cfg " +
					  "./darknet_user_files/projects/" + id + "/weights/yolo_final.weights " + 
					  full_filename
				exec(cmd, function callback(error, stdout, stderr){
					exec("rm ./tmp/" + req.file.filename, function(err, s, e){ // delet
						res.json({ result: stdout })
					})
				})
			} else {
				res.json({"err": "your model is not trained yet"})
			}
		})
	})
})

// why tf is my method here named delete
router.post('/:project_id/delete', passport.authenticate('accessToken'), isCorrectUser, function(req, res){
	Project.removeProject(req.params["project_id"], function(result){
		res.json(result)
	})
})

router.post('/:project_id/models/add', passport.authenticate('accessToken'), isCorrectUser, zip.single("file"), function(req, res){
	Project.addModel(req.params["project_id"], req.file, req.body.name, req.body.image_url, req.body.store_url, req.body.price, function(project){
		res.json(project)
	})
})

// and over here its named remove
router.post('/:project_id/models/remove', passport.authenticate('accessToken'), isCorrectUser, function(req, res){
	Project.removeModel(req.params["project_id"], req.body._id, function(project){
		res.json(project)
	})
})

router.get('/:project_id', passport.authenticate('accessToken'), isCorrectUser, function(req, res){
	Project.findOneProject(req.params["project_id"], function(project){
		res.json(project)
	})
})

router.post('/:project_id/train', passport.authenticate('accessToken'), isCorrectUser, function(req, res){
	var id = req.params["project_id"]
	Project.findOneProject(id, function(project){
		if(!project.in_training){
			// exec("kill $(ps aux | grep " + id + " | awk \'{print $2}\')") // kills preloaded darknet to free up gpu memory
			Project.findOneAndUpdate({_id: new ObjectId(id)}, { in_training: true, trained: false }, function(err, project){
				if(err) throw err
				var sp = spawn("python", ["darknet.py", id])
				var s = spawn("python", ["bg/generate.py", id])
				res.json({"success": true })
			})
		} else {
			res.json({"err": "already training"})
		}
	})
})

function isCorrectUser(req, res, next){
	if(req.isAuthenticated()){
		res.locals.user_id = req.user._id
		Project.findOneProject(req.params["project_id"], function(project){
			if(project.userId === res.locals.user_id.toString()){
			  // console.log("true")
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

module.exports = router;