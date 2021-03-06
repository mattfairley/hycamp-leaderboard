UI.admin.container = React.createClass({

	_eventHashchange: null,

	getInitialState() {
	    return {
	        title: 'Loading...',
	        navigation: '#',
	        user: {}
	    };
	},

	urlDidChange(location){
	    var loc = location.charAt(0) === '#' ? location.substr(1) : location;
	    var body = document.getElementById('admin-container');

	    var route = HYC.router.rr.recognize(loc);

	    if(route){
	        console.info('[UI.admin.container] New route found', loc, route);
	        route[0].handler(body, route.queryParams);
	        // TODO: Look at docs to find out how to pass params to route
	        // route[0].handler(body, route[0].params);
	    }else{
	        console.error('[UI.admin.container] No route found', loc);
	    }
	},

	componentDidMount() {
	    // Subscribe to events
	    this._eventHashchange = HYC.events.subscribe('hashchange', this.urlDidChange);
	    this.urlDidChange(window.location.hash);

	},

	componentWillUnmount(){
	    this._eventHashchange.remove();
	},

	render(){

		return(
			<div id='admin-container' className='body-container'>
				
			</div>

		);
	}
});
