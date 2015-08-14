HYC.data.events = {

	list: function() {
	    return qwest.get('api/events');
	},

	add: function(data) {
	    return qwest.post('api/events', data);
	},

	delete: function(id) {
	    return qwest.delete('api/events/' + id);
	},

	edit: function(id, data) {
	    return qwest.post('api/events/' + id);
	},

	details: function(id) {
	    return qwest.get('api/events/' + id);
	}
	
};