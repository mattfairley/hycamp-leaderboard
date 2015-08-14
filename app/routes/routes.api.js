var express = require('express');
var router = express.Router();

router.use(function(req, res, next){
	res.contentType('application/json');
	// res.setHeader('Access-Control-Allow-Origin', '*');
	// res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
	// res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \ Authorization');
	next();
})

router.get('/', function(req, res) {
    res.json({ message: 'get an API' });   //test route message
});


router.route('/cabins')

	//get list of cabins
	.get(function(req,res){
		var Cabin = req.app.get('models').cabin;
	    Cabin.find(function(err, cabin) {
	    	var output = {results: cabin}
	        if (err)
	            return res.send(err);
	        res.json(output);
	    });
	})

	//create new cabins
	.post(function(req,res){
		var Cabin = req.app.get('models').cabin;
		var cabin = new Cabin();      
		cabin.name = req.body.name;
		cabin.points = 0;
		cabin.members = req.body.members;
		cabin.icon = req.body.icon
	   
		cabin.save(function(err) {
	    	if (err)
	        	return res.send(err);

	    	res.json({ message: 'cabin created', data: cabin });
		});
	})

router.route('/cabins/:id')
	.get(function(req, res){
		var Cabin = req.app.get('models').cabin;
		Cabin.findById(req.params.id, function(err, cabin) {
			if (err) return res.send(err);

			// return that Cabin
			res.json(cabin);
		});

	})

	.post(function(req, res){
		var Cabin = req.app.get('models').cabin;
		Cabin.findById(req.params.id, function(err, cabin) {
			if (err) return res.send(err);

			if (req.body.name) cabin.name = req.body.name;
			if (req.body.points) cabin.points = req.body.points;
			if (req.body.members) cabin.members = req.body.members;
			if (req.body.icon) cabin.icon = req.body.icon;

			cabin.save(function(err) {
				if (err) return res.send(err);

				// return a message
				res.json(cabin);
			});

		});
	})

	.delete(function(req, res){
		var Cabin = req.app.get('models').cabin;
		Cabin.remove({
			_id: req.params.id
		}, function(err, cabin) {
			if (err) return res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	})

router.route('/events')

	//get list of events
	.get(function(req,res){
		var Event = req.app.get('models').event;
	    Event.find(function(err, event) {
	    	var output = {results: event}
	        if (err)
	            return res.send(err);

	        res.json(output);
	    });
	})

	//create new events
	.post(function(req,res){
		var Event = req.app.get('models').event;
		var event = new Event();      
		event.name = req.query.name;
		event.location = req.query.location;
		event.time = req.query.time
		event.description = req.query.description;
	   
		event.save(function(err) {
	    	if (err)
	        	return res.send(err);

	    	res.json({ message: 'event created' });
		});
	})

router.route('/events/:id')
	.get(function(req, res){
		var Event = req.app.get('models').event;
		Event.findById(req.params.id, function(err, event) {
			if (err) return res.send(err);

			// return that Cabin
			res.json(event);
		});

	})

	.post(function(req, res){
		var Event = req.app.get('models').event;
		Event.findById(req.params.id, function(err, event) {
			if (err) return res.send(err);

			if (req.query.name) event.name = req.query.name;
			if (req.query.location) event.location = req.query.location;
			if (req.query.description) event.description = req.query.description;
			if (req.query.time) event.time = req.query.time;

			event.save(function(err) {
				if (err) return res.send(err);

				// return a message
				res.json(event);
			});

		});
	})

	.delete(function(req, res){
		var Event = req.app.get('models').event;
		Event.remove({
			_id: req.params.id
		}, function(err, event) {
			if (err) return res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	})

module.exports = router;