var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	res.render('admin', { title: 'HackerYou.camp Admin', message: 'This is a real website FOR ADMINS'});
})

module.exports = router;