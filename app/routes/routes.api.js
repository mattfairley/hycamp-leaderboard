var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
    res.json({ message: 'get an API' });   //test route message
});


router.route('/cabins')

	//get list of cabins
	.get(function(req,res){
		var Cabin = app.get('models').cabin;
	    Cabin.find(function(err, cabin) {
	        if (err)
	            return res.send(err);

	        res.json(cabin);
	    });
	})

	//create new cabins
	.post(function(req,res){
		var Cabin = app.get('models').cabin;
		var cabin = new Cabin();      
		cabin.name = req.body.name;
		cabin.points = 0;
		cabin.members = req.body.members;
	   
		cabin.save(function(err) {
	    	if (err)
	        	return res.send(err);

	    	res.json({ message: 'cabin created' });
		});
	})

router.route('/cabins/:id')
	.get(function(req, res){
		var Cabin = app.get('models').cabin;
		Cabin.findById(req.params.id, function(err, cabin) {
			if (err) return res.send(err);

			// return that Cabin
			res.json(cabin);
		});

	})

	.post(function(req, res){
		var Cabin = app.get('models').cabin;
		Cabin.findById(req.params.id, function(err, cabin) {
			if (err) return res.send(err);

			if (req.body.name) cabin.name = req.body.name;
			if (req.body.points) cabin.points = req.body.points;
			if (req.body.members) cabin.members = req.body.members;

			cabin.save(function(err) {
				if (err) return res.send(err);

				// return a message
				res.json(cabin);
			});

		});
	})

	.delete(function(req, res){
		var Cabin = app.get('models').cabin;
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
		var Event = app.get('models').event;
	    Event.find(function(err, event) {
	        if (err)
	            return res.send(err);

	        res.json(event);
	    });
	})

	//create new events
	.post(function(req,res){
		var Event = app.get('models').event;
		var event = new Event();      
		event.name = req.body.name;
		event.location = req.body.location;
		event.time = req.body.time
		event.description = req.body.description;
	   
		event.save(function(err) {
	    	if (err)
	        	return res.send(err);

	    	res.json({ message: 'event created' });
		});
	})

router.route('/events/:id')
	.get(function(req, res){
		var Event = app.get('models').event;
		Event.findById(req.params.id, function(err, event) {
			if (err) return res.send(err);

			// return that Cabin
			res.json(event);
		});

	})

	.post(function(req, res){
		var Event = app.get('models').event;
		Event.findById(req.params.id, function(err, event) {
			if (err) return res.send(err);

			if (req.body.name) event.name = req.body.name;
			if (req.body.location) event.location = req.body.location;
			if (req.body.description) event.description = req.body.description;
			if (req.body.time) event.time = req.body.time;

			event.save(function(err) {
				if (err) return res.send(err);

				// return a message
				res.json(event);
			});

		});
	})

	.delete(function(req, res){
		var Event = app.get('models').event;
		Event.remove({
			_id: req.params.id
		}, function(err, event) {
			if (err) return res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	})

module.exports = router;