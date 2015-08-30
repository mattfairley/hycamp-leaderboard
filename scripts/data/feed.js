HYC.data.feed = {
	list: function() {
		return qwest.get('api/feed/');
	},

	more: function(min, max) {
		return qwest.get('api/feed/' + min + '/' + max);
	}
};