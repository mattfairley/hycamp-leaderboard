var mongoose = require('mongoose');
var express = require('express');

// GET TO ROUTIN'
var app = express();
var api = express();
var router = express.Router();

router.use(function(req, res, next) {
 
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// space for more routes

app.use('/api', api);

api.get('/', function(req, res) {
    res.json({ message: 'get an API' });   //test route message
});




api.route('/house')

.post(function(req, res) {
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
.get(function(req, res) {
        House.find(function(err, house) {
            if (err)
                res.send(err);

            res.json(house);
        });
    });
app.use('/api', api);
