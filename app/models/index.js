var mongoose = require('mongoose');
var Schema = mongoose.Schema;


module.exports = function() {
	var models = {
		cabin: mongoose.model('cabin', {
			id: {type: Schema.Types.ObjectId},			
			name: String,
			points: Number,
			members: [String],
			icon: String
		}),

		event: mongoose.model('event', {
			id: {type: Schema.Types.ObjectId},
			name: String,
			location: String,
			description: String,
			time: {type: Date, default: Date.now}
		})

	}

	return models
}