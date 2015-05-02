// GATHER YOUR PARTY BEFORE VENTURING FORTH

var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser') //parser for JSON

// SET THE BIG VARIABLES
var app = express();
var port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// CONNECT TO THE DATABASE
mongoose.connect('mongodb://localhost/db_leaders');

// BRING IN THE MODEL
var House = require('./app/models/house.js');

// BRING IN THE ROUTER
var API = require('./app/routes/routes.js')

//PARTY DOWN
app.listen(port);
console.log('the party happens at http://localhost' + port);

//GET THIS UNDERWAY
