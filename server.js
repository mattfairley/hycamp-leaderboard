// GATHER YOUR PARTY BEFORE VENTURING FORTH

var mongoose = require('mongoose');
var express = require('express');
var jade = require('jade');
var morgan = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser'); //parser for JSON
var config = require('./config/config');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var uuid = require('uuid');

// SET THE BIG VARIABLES
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
	genid: function(req) {
		return uuid.v4()
	},
	resave: false,
	saveUninitialized: false,
	secret: config.appSecret,
	store: new MongoStore({
		url: config.db_url,
		ttl: 3 * 24 * 60 * 60 //3 days expiry
	})
}));

// CONNECT TO THE DATABASE
mongoose.connect(config.db_url);

// BRING IN THE MODELS
app.set('models', require('./app/models')(app, mongoose));

// BRING IN THE ROUTER
var routes = require('./app/routes/routes.core');
app.use('/', routes);

// VIEWS
app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static( __dirname + '/compiled'));

//PARTY DOWN
app.listen(config.port);
console.log('the party happens at http://localhost:' + config.port);