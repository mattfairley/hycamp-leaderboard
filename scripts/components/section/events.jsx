UI.section.events = {
	register(){
        console.info('[UI.section.events] register route');
        HYC.router.rr.add([{ path: '/events', handler: UI.section.events.render }]);
    },

    render(container, params) {
    	console.info('[UI.section.events] rendering section');
    	React.render(<UI.section.events.element />, container);
    	HYC.events.publish('sectionChange', {section: 'Events'});
    },

    element: React.createClass({
    	getInitialState() {
    		return {events: []};
    	},

    	componentWillMount() {
    		var self = this;
    		HYC.data.events.list().then(function(res, data){
    			self.setState({events: data.results});
    		}).catch(function(err){
    			console.error('Error getting event list', err);
    		});
    	},

    	render() {
    		console.log('Rendering', this.state.events);
    		var events = this.state.events.map(event => {
    			return <UI.common.eventList event={event} key={event._id} />;
    		});

    		return (
    			<div className="section-wrapper">
    				<ul className="event-list">
    					{events}
    				</ul>
    			</div>

    		);
    	}
    })

};