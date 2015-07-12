var mongoose = require('mongoose');
var Schema = mongoose.Schema;


module.exports = function() {
	var models = {
		house: mongoose.model('house', {
			id: {type: Schema.Types.ObjectId},			
			name: String,
			points: Number,
			members: [String]
		}),

		user: mongoose.model('house', {
			uid: {type: Schema.Types.ObjectId},
			cabin: {type: Schema.Types.ObjectId, ref: 'house', index: true},
			points: Number
		})

		//TODO: Events
	}

	return models
}