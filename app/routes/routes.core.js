var mongoose = require('mongoose');
var express = require('express');

// GET TO ROUTIN'
var api = require('./routes.api');

var router = express.Router();

router.use(function(req, res, next) {
 
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function (req, res){
	console.log('we here');
	res.render('index', { title: 'HackerYou.camp', message: 'This is a real website'});
})

router.use('/api', api);

module.exports = router;

