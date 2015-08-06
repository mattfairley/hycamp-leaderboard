var mongoose = require('mongoose');
var Schema = mongoose.Schema;


module.exports = function() {
	var models = {
		cabin: mongoose.model('cabin', {
			id: {type: Schema.Types.ObjectId},			
			name: String,
			points: Number,
			members: [String]
		}),

		event: mongoose.model('event', {
			id: {type: Schema.Types.ObjectId},
			location: String,
			description: String,
			time: {type: Date, default: Date.now}
		})

	}

	return models
}