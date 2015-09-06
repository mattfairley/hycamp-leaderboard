var express = require('express');
var router = express.Router();
var config = require('../../config/config.js');
var sess;

function requireLogin(req, res, next) {
	sess = req.session;
	if (sess.loggedIn) {
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
	sess = req.session;
	var error;
	if (sess.loginFail) {
		error = 'Login failed'
	}
	res.render('login', {title: 'Log in', error: error});
});

router.post('/login', function(req, res){
	sess = req.session;
	//check to see if username and password match the presets
	if (req.body.username === config.admin_username && req.body.password === config.admin_password) {
		sess.loggedIn = true;
		sess.loginFail = false;
		res.redirect('/admin');
	} else {
		sess.loginFail = true;
		res.redirect('/admin/login')
	}
});

module.exports = router;