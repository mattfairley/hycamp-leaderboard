var express = require('express');
var app = express();
var router = express.Router();
var config = require('../../config/config.js');
var session = require('express-session');
var uuid = require('uuid');

router.use(session({
	genid: function(req) {
		return uuid.v4()
	},
	resave: false,
	saveUninitialized: false,
	secret: config.appSecret
}));

router.use(function(req,res,next){
	console.log('This is where auth will go, limiting access to the admin panel');
	next();
});

function requireLogin(req, res, next) {
	if (req.session.loggedIn) {
		next();
	} else {
		res.redirect('admin/login');
	}
}

router.get('/', requireLogin, function(req, res){
	// router.get('/', function(req, res){

	res.render('admin', { title: 'HYCamp Admin', message: 'This is a real website'});
});

router.get('/login', function(req, res){

	res.render('login', {title: 'Log in'});
});

router.post('/login', function(req, res){
	console.log(req.body);

	//check to see if username and password match the presets
	if (req.body.username === config.username && req.body.admin.password === config.admin.password) {
		console.log('done');
		res.session.loggedIn = true;
		res.redirect('admin/');
	} else {
		res.json({success: false});
	}
});

module.exports = router;