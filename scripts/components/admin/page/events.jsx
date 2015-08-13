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
        HYC.events.publish('sectionChange', {section: 'Events'});
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

    	openModal: function() {
    		UI.admin.modal.cabin.open();
    	},

    	render: function() {
    		console.log('Rendering', this.state.events);
    		var events = this.state.events.map(function(event) {
                return <UI.admin.event event={event} id={event._id} />;
            });


            return (
                <div className="admin-wrapper">
                    <div className="admin__header">
                    	<h2>Events</h2>
                    	<button className="btn btn-blue" onClick={this.openModal} >Add new</button>
                    </div>
    	            <ul className="event-list">
    	    	        {events}
        	        </ul>
                </div>
            );
    	}
    })
};