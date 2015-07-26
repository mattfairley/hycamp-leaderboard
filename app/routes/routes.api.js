var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
    res.json({ message: 'get an API' });   //test route message
});

router.get('/house', function (req, res){
    House.find(function(err, house) {
        if (err)
            res.send(err);

        res.json(house);
    });
});

router.post('/house', function(req, res){

		console.log('house');
		var house = new House();      
		house.name = req.body.name;
		house.points = req.body.points; 
	   
		house.save(function(err) {
	    	if (err)
	        	res.send(err);

	    	res.json({ message: 'GOT HOUSES!' });
		});
})

module.exports = router;