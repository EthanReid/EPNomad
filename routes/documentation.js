var express = require('express');
var router = express.Router();
var fs = require('fs')
var marked = require('marked')

// do this on the user end so less bandwidth lel
// todo later
marked.setOptions({
	highlight: function (code) {
		return require('highlight.js').highlightAuto(code).value;
	}
});

router.get('/', function(req, res){
	fs.readdir('documentation/', (err, files) => {
		res.render("documentation/index.ejs", { docs: files })
	})
})

router.get('/:wrapper', function(req, res){
	var wrapper = req.params["wrapper"]
	var title = wrapper + " | Nomad Recognition"
	fs.readFile('documentation/' + wrapper + ".md", 'utf-8', function(err, data) {
		if(err) { 
			res.locals.message = "404 Not Found";
			// res.locals.error = req.app.get('env') === 'development' ? err : {};
			res.locals.error = ""
			res.status(404);
			res.render('error');
		} else {
			res.render("documentation/wrappers.ejs", { markdown: marked(data), title: title })
		}
	});
})

module.exports = router;