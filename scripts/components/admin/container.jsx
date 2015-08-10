if (typeof(UI) === 'undefined') var UI = {};
if (typeof(UI.admin) === 'undefined') UI.admin = {};

UI.admin.container = React.createClass({

	_eventHashchange: null,

	getInitialState: function() {
	    return {
	        title: 'Loading...',
	        navigation: '#',
	        user: {}
	    };
	},

	urlDidChange: function(location){
	    var loc = location.charAt(0) === '#' ? location.substr(1) : location;
	    var body = document.getElementById('admin-container');

	    var route = HYC.router.rr.recognize(loc);

	    if(route){
	        console.info('[UI.admin.container] New route found', loc, route);
	        route[0].handler(body, route[0].params);
	    }else{
	        console.error('[UI.admin.container] No route found', loc);
	    }
	},

	componentDidMount: function() {
	    // Subscribe to events
	    this._eventHashchange = HYC.events.subscribe('hashchange', this.urlDidChange);
	    this.urlDidChange(window.location.hash);

	},

	componentWillUnmount: function(){
	    this._eventHashchange.remove();
	},

	render: function(){
		var self = this;

		return(
			<div id='admin-container' className='body-container'>

			</div>

		);
	}
});
