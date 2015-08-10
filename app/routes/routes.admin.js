var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	res.render('admin', { title: 'HYCamp Admin', message: 'This is a real website'});
})

module.exports = router;