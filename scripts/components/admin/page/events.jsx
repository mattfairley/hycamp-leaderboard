if (typeof(UI) === 'undefined') var UI = {};
if (typeof(UI.admin) === 'undefined') UI.admin = {};
if (typeof(UI.admin.page) === 'undefined') UI.admin.page = {};

UI.admin.page.events = {
	register: function(){
        console.info('[UI.admin.page.events] register route');
        HYC.router.rr.add([{ path: '/events', handler: UI.admin.page.events.render }]);
    },

    render: function(container, params){
        console.info('[UI.admin.page.events] rendering page');
        React.render(<UI.admin.page.events.element />, container);
        HYC.events.publish('sectionChange', {section: 'events'});
    },

    element: React.createClass({
    	getInitialState: function() {
    		return {events: []};
    	},

    	componentWillMount: function() {
    		var self = this;
    		HYC.data.events.list().then(function(res, data){
    			self.setState({events: data.results});
    		}).catch(function(err){
    			console.error('Error getting event list', err);
    		});
    	},

    	render: function() {
    		console.log('Rendering', this.state.events);
    		return (
    			<div className="event-list">
    				<h2>Events</h2>
    			</div>
    			);
    	}
    })
};