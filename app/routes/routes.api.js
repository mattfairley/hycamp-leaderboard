var express = require('express');
var router = express.Router();
var moment = require('moment');
var ig = require('instagram-node').instagram({});
var config = require('../../config/config.js')
ig.use({client_id: config.ig_client_id, client_secret: config.ig_client_secret});

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
	    	console.log('Saving new cabin', req.body.name);

	    	res.json({ message: 'cabin created', data: cabin });
		});
	})

router.route('/cabins/:id')
	.get(function(req, res){
		var Cabin = req.app.get('models').cabin;
		Cabin.findById(req.params.id, function(err, cabin) {
			if (err) return res.send(err);
			console.log('Getting cabin details', cabin.name);
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
				console.log('Saving cabin details', cabin.name);
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
			console.log('Deliting cabin', cabin.name);
			res.json({ message: 'Successfully deleted' });
		});
	})

router.route('/events')

	//get list of events
	.get(function(req,res){
		var Event = req.app.get('models').event;
	    Event.find(function(err, events) {
	    	var output = {results: events}
	        if (err)
	            return res.send(err);
	        res.json(output);
	    });
	})

	//create new events
	.post(function(req,res){
		var Event = req.app.get('models').event;
		var event = new Event();  

		event.name = req.body.name;
		event.location = req.body.location;
		event.duration = req.body.duration;
		event.time = moment(req.body.time, 'MMM DD HH:mm');
		event.description = req.body.description;
		event.save(function(err) {
	    	if (err)
	        	return res.send(err);
	        console.log('Creating event', event.name);
	    	res.json({ message: 'event created' });
		});
	})

router.route('/events/:id')
	.get(function(req, res){
		var Event = req.app.get('models').event;
		Event.findById(req.params.id, function(err, event) {
			if (err) return res.send(err);
			console.log('Getting event details', event.name);
			// return that Cabin
			res.json(event);
		});

	})

	.post(function(req, res){
		var Event = req.app.get('models').event;
		Event.findById(req.params.id, function(err, event) {
			if (err) return res.send(err);
			if (req.body.name) event.name = req.body.name;
			if (req.body.location) event.location = req.body.location;
			if (req.body.duration) event.duration = Number(req.body.duration);
			if (req.body.description) event.description = req.body.description;
			if (req.body.time) event.time = moment(req.body.time, 'MMM DD HH:mm');

			event.save(function(err) {
				if (err) return res.send(err);
				console.log('Editing event details', event.name);
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
			console.log('Deleting event', event.name);
			res.json({ message: 'Successfully deleted' });
		});
	});

router.route('/feed')
	.get(function(req,res){
		ig.tag_media_recent('hycamp', {count: 5}, function(err, result, pagination, remaining, limit) {
			res.json({
				results: result,
				more: pagination
			});
		});
	});

router.route('/feed/:min/:max')
	.get(function(req, res){
		ig.tag_media_recent('hycamp', {
				// min_tag_id: req.params.min,
				max_tag_id: req.params.max,
				count: 5
			}, function(err, result, pagination, remaining, limit) {
			res.json({ 
				results: result,
				more: pagination
			});
		});
	});


module.exports = router;