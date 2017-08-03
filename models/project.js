var mongoose = require('mongoose')
var ObjectId = require('mongoose').Types.ObjectId
var fs = require('fs')
var extract = require('extract-zip')
var exec = require('child_process').exec
var crypto = require('crypto')
var utils = require('../config/util.js')

var projectSchema = mongoose.Schema({
	name: String,
	userId: String, 
	clientId: String,
	trained: Boolean,
	in_training: Boolean,
	clientSecret: String, 
	hits: Number, // number of times called
	clicks: Number,
	models: [
		{
			name: String,
			datas: Array,
			image_url: String,
			store_url: String,
			hits: Number, // number of times recognized
			price: Number
		}
	], 
}, {
	timestamps: true
})

var generateSecret = function(){
	var token = utils.uid(256)
	var hash = crypto.createHash('sha1').update(token).digest('hex')
	return hash
}

var Project = mongoose.model('Project', projectSchema);

module.exports = Project

module.exports.findUser = function(id, callback){
	Project.find({ userId: id }, function(err, projects){
		if(err) throw err
		callback(projects)
	})
}

module.exports.addProject = function(body, userId, callback){
	var newProject = new Project({
		name: body.name,
		userId: userId,
		trained: false,
		in_training: false,
		clientSecret: generateSecret(),
		models: []
	})
	newProject.save(function(err, project){
		if(err) throw err
		var folders = ["labels", "cfg", "vanilla_images", "images", "models", "training_lists", "weights"]
		var dir = "darknet_user_files/projects/" + project._id + "/"
		// create project files
		fs.mkdirSync(dir)
		for(var i=0;i<folders.length;i++){
			fs.mkdirSync(dir + folders[i]);
		}
		callback(project)
	})
}

module.exports.regenerateSecret = function(id, callback){
	Project.findOneAndUpdate({ _id: ObjectId(id)}, { clientSecret: generateSecret() }, function(err, project){
		if(err) throw err
		callback(project)
	})
}

module.exports.removeProject = function(id, callback){
	Project.remove({_id: new ObjectId(id)}, function(err){
		if(err) throw err
		exec("rm -rf ./darknet_user_files/projects/" + id) // delete project directory
		callback({"success": "deleted project " + id})
	})
}

module.exports.hitModel = function(id, name, callback){
	Project.findById(id, function(err, project){
		if(err) throw err
		project.hits++ // update project counter 
		for(var i=0;i<project.models.length;i++){
			if(project.models[i].name===name){
				project.models[i].hits++ // update counter
				break
			}
		}
		project.save(function(err, project){
			if(err) throw err
			callback(project)
		})
	})
}

module.exports.addModel = function(id, file, name, image_url, shop_url, price, callback){
	if(file !== undefined){
		Project.findById(id, function(err, project){
			if(err) throw err
			// make model folder
			var dir = "darknet_user_files/projects/" + project._id + "/models/"
			fs.mkdirSync(dir + name)
			extract("./darknet_user_files/zips/" + file.filename, {dir: "darknet_user_files/projects/" + id + "/models/" + name }, function (err) {
				if(err) throw err
				var datas;
				exec("rm ./darknet_user_files/zips/" + file.filename) // delete zip file
				fs.readdir("./darknet_user_files/projects/" + id + "/models/" + name.replace(" ",""), function(err, items) {
					if(err) throw err
					datas = items
					var models = project.models
					var model = { name: name, datas: datas, image_url: image_url, store_url: shop_url, price: price }
					models.push(model)
					project.models = models
					project.save(function(err, project){
						if(err) throw err
						callback(project)
					})
				});
			})
		})
	} else {
		callback({"err": "no file attached"})
	}
}

module.exports.removeModel = function(id, model_id, callback){
	Project.findById(id, function(err, project){
		if(err) throw err
		var models = project.models
		var index
		for(var i=0;i<models.length;i++){
			if(ObjectId(models[i]._id).toString() == model_id){
				index = i
				break
			}
		}
		exec("rm -rf ./darknet_user_files/projects/" + id + "/models/" + project.models[index].name) // remove model directory
		models.splice(index, 1)
		project.models = models
		project.save(function(err, project){
			if(err) throw err
			callback(project)
		})
	})
}