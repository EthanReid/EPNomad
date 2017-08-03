var express = require('express');
var router = express.Router();
var multer = require('multer');
var Project = require('../models/project.js')
var exec = require('child_process').exec
var ObjectId = require('mongoose').Types.ObjectId
var crypto = require('crypto')
var utils = require('../config/util.js')
var fs = require('fs')

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

var yolo = multer({storage: yoloStorage})

router.get('/', function(req, res){
	res.render('zappos/index.ejs')
})

// router.post('/detect', yolo.single('file'), function(req, res){
// 	if(req.file !== undefined){
// 		// sudo ldconfig /usr/local/cuda/lib64 solves the problem for libcudart not being found
// 		// var cmd = "./darknet detector test ./zappos/cfg/yolo.data " +
// 		// 	"./zappos/cfg/yolo.cfg " +
// 		// 	"./zappos/weights/yolo_final.weights " + 
// 		// 	"./tmp/" + req.file.filename + " -gpus 0,1,2,3"
// 		var cmd = "./darknet detector test ./zappos/coco.data " +
// 			"./zappos/yolo.cfg " +
// 			"./zappos/yolo.weights " + 
// 			"./tmp/" + req.file.filename
// 		console.log(cmd)
// 		exec(cmd, function callback(error, stdout, stderr){
// 			exec("rm ./tmp/" + req.file.filename, function(err, s, e){ 
// 				console.log(error)
// 				res.json({ result: stdout })
// 			})
// 		})
// 	} else {
// 		res.json({"err": "no file attached"})
// 	}
// })

router.post('/detect_idk', yolo.single('file'), function(req, res){
	if(req.file != undefined){
		var cmd = "./darknet detector test ./zappos/coco.data " +
			"./zappos/yolo.cfg " +
			"./zappos/yolo.weights " + 
			"./tmp/" + req.file.filename
		
		exec(cmd, function callback(error, stdout, stderr){
			exec("rm ./tmp/" + req.file.filename, function(err, s, e){ 
	  			var str = stdout.substring(stdout.indexOf(" seconds.") + 9) // remove characters before string
				str = str.split("\n")
				arr = []
				for(var i=0;i<str.length;i++){
					var name = str[i].split(":")[0] 
					var confidence = str[i].split(":")[1]
					if(str[i] != ""){
						arr.push({name: name, confidence: confidence.replace("%","").replace(" ","")})
					}
				}
				console.log(arr)
				res.json({ results: arr })
			})
		})
	}
})

router.post('/detect', function(req, res){ // take it with b64 encoding
	var base64Data = req.body.base64.replace(/^data:image\/\w+;base64,/, ""); // for ajax requests
	var name = utils.uid(64) // generate random string
	var filename = name + ".jpg"
	var full_filename = "./tmp/" + filename
	fs.writeFile(full_filename, base64Data, 'base64', function(err) {
		var cmd = "./darknet detector test ./zappos/coco.data " +
			"./zappos/yolo.cfg " +
			"./zappos/yolo.weights " + 
			"./tmp/" + filename
		
		exec(cmd, function callback(error, stdout, stderr){
			exec("rm ./tmp/" + filename, function(err, s, e){ 
	  			var str = stdout.substring(stdout.indexOf(" seconds.") + 9) // remove characters before string
				str = str.split("\n")
				arr = []
				for(var i=0;i<str.length;i++){
					var name = str[i].split(":")[0] 
					var confidence = str[i].split(":")[1]
					if(str[i] != ""){
						arr.push({name: name, confidence: confidence.replace("%","").replace(" ","")})
					}
				}
				console.log(arr)
				res.json({ results: arr })
			})
		})
	})
})

module.exports = router;