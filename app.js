var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var cors = require('cors');
var passport = require('passport');
var cookieSession = require('cookie-session');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var https = require('https')
var http = require('http')
var fs = require('fs')

var index = require('./routes/index');
var users = require('./routes/users');
var billing = require('./routes/subs.js')
var projects = require('./routes/projects.js')
var zappos = require('./routes/zappos.js')
var documentation = require('./routes/documentation.js')
var api_index = require('./routes/api/index.js')
var api_projects = require('./routes/api/projects.js');


var app = express();
mongoose.connect("mongodb://localhost/nomad")

var options = {
	key: fs.readFileSync('certs/key.pem'),
	cert: fs.readFileSync('certs/cert.pem')
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'img/favicon.png')));
app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
	name: 'session',
	keys: ["ayy lmao nomad server yee mang 2048 bits random codeees 8777"],
	maxAge: 14 * 24 * 60 * 60 * 1000 // 14 days or 2 weeks
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
require('./config/passport')(passport)
app.use(compression())
app.use(function (req, res, next) {
	res.locals.login = req.isAuthenticated();
	res.locals.user = req.user
	next();
});

app.use('/', index)
app.use('/', users)
app.use('/billing/', billing)
app.use('/projects/', projects)
app.use('/zappos', zappos)
app.use('/documentation/', documentation)
app.use('/api/', api_index)
app.use('/api/projects/', api_projects)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;

http.createServer(app).listen(80);
https.createServer(options, app).listen(443);