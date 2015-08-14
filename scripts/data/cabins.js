HYC.data.cabins = {

	list: function() {
	    return qwest.get('api/cabins');
	},

	add: function(data) {
	    return qwest.post('api/cabins', data);
	},

	delete: function(id) {
	    return qwest.delete('api/cabins/' + id);
	},

	edit: function(id, data) {
	    return qwest.post('api/cabins/' + id, data);
	},

	details: function(id) {
	    return qwest.get('api/cabins/' + id);
	}
	
};