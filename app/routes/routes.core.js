var mongoose = require('mongoose');
var express = require('express');

var router = express.Router();

router.use(function(req, res, next) {
 
    // console.log('This is where auth will go');
    next();
});

router.get('/', function (req, res){
	res.render('index', { title: 'HackerYou.camp'});
})

// GET TO ROUTIN'
router.use('/api', require('./routes.api'));
router.use('/admin', require('./routes.admin'));

module.exports = router;

