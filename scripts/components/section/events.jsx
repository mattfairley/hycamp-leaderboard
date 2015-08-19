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

    		var events = HYC.sort(this.state.events, 'time', false);

    		events = events.map(event => {
    			event.sortDate = moment(event.time).format('dddd');
    			event.sortTime = moment(event.time).format('h:mma');
    			return event;
    		});

    		console.log(events);

    		events = HYC.groupBy(events, 'sortDate');


    		var days = [];

    		for (var date in events) {
    			var eventDate = {
    				date: date,
    				times: []
    			};
    			var eventsByTime = HYC.groupBy(events[date], 'sortTime');
    			for (var time in eventsByTime) {
    				var eventTime = {
    					time: time,
    					events: eventsByTime[time],
    					moment: moment(eventsByTime[time][0])
    				};
    				eventDate.times.push(eventTime);
    			}
    			days.push(eventDate);
    		}

		   	days = days.map(day => {
		    	return <UI.common.dateEvents times={day.times} key={day.date} date={day.date} />;
		    });

    		return (
    			<div className="section-wrapper">
    				<div className="event-list">
    					{days}
    				</div>
    			</div>

    		);
    	}
    })

};