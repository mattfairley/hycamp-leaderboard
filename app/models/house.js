var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var houseSchema = new Schema({
	id: Number,
	name: String,
	points: Number,
	members: [String]
});

module.exports = mongoose.model('houses', houseSchema);