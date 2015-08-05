var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
    res.json({ message: 'get an API' });   //test route message
});


router.route('/houses')

	//get list of houses
	.get(function(req,res){
		var House = app.get('models').house;
	    House.find(function(err, house) {
	        if (err)
	            return res.send(err);

	        res.json(house);
	    });
	})

	//create new houses
	.post(function(req,res){
		var House = app.get('models').house;
		var house = new House();      
		house.name = req.body.name;
		house.points = 0;
		house.members = req.body.members;
	   
		house.save(function(err) {
	    	if (err)
	        	return res.send(err);

	    	res.json({ message: 'house created' });
		});
	})

router.route('/houses/:id')
	.get(function(req, res){
		var House = app.get('models').house;
		House.findById(req.params.id, function(err, house) {
			if (err) return res.send(err);

			// return that House
			res.json(house);
		});

	})

	.post(function(req, res){
		var House = app.get('models').house;
		House.findById(req.params.id, function(err, house) {
			if (err) return res.send(err);

			if (req.body.name) house.name = req.body.name;
			if (req.body.points) house.points = req.body.points;
			if (req.body.members) house.members = req.body.members;

			house.save(function(err) {
				if (err) return res.send(err);

				// return a message
				res.json(house);
			});

		});
	})

	.delete(function(req, res){
		var House = app.get('models').house;
		House.remove({
			_id: req.params.id
		}, function(err, house) {
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

			// return that House
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