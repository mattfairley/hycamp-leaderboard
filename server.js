// GATHER YOUR PARTY BEFORE VENTURING FORTH

var mongoose = require('mongoose');
var express = require('express');
var jade = require('jade');
var bodyParser = require('body-parser') //parser for JSON

// SET THE BIG VARIABLES
var app = express();
var port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// CONNECT TO THE DATABASE
mongoose.connect('mongodb://localhost/db_leaderboard');

// BRING IN THE MODEL
var House = require('./app/models/house');

// BRING IN THE ROUTER
var routes = require('./app/routes/routes.core');
app.use('/', routes);

// VIEWS
app.set('views', './views');
app.set('view engine', 'jade');
app.use( express.static( __dirname + "/static" ) );
app.use( express.static( __dirname + "/compiled" ) );

//PARTY DOWN
app.listen(port);
console.log('the party happens at http://localhost:' + port);