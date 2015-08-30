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

    		// Create a new moment for comparison
    		var now = new moment();

    		// Sort the events by time
    		var events = HYC.sort(this.state.events, 'time', false);

    		// Add some new time-related events to the event object
    		events = events.map(event => {
    			var m = moment(event.time);
    			var end = moment(event.time).add(event.duration, 'm');
    			event.moment = m;
    			event.sortDate = m.format('DD-MM-YYYY');
    			event.displayDate = m.format('dddd');
    			event.sortTime = m.format('h:mma');
    			event.endTime = end;
    			// is the event happening
    			event.happening = m < now && end > now ? true : false;
    			// has the event happened
    			event.happened = event.endTime < now ? true : false;
    			return event;
    		});

    		// Group the events by day
    		events = HYC.groupBy(events, 'sortDate');

    		var days = [];
    		// Turn that object into an array
    		for (var date in events) {
    			var m = moment(date, 'DD-MM-YYYY').endOf('day');
    			var eventDate = {
    				sortDate: date,
    				date: m.format('dddd'),
    				moment: m,
    				times: []
    			};
    			// Take the events in each day and group by time
    			var eventsByTime = HYC.groupBy(events[date], 'sortTime');
    			// turn that object into an array
    			for (var time in eventsByTime) {
    				var eventTime = {
    					time: time,
    					events: eventsByTime[time],
    					// moment: moment(eventsByTime[time][0])
    				};
    				eventDate.times.push(eventTime);
    			}
    			days.push(eventDate);
    		}
		    console.log('Rendering', days);

		   	// check to see if the event has already happened, if not, make a react component
		   	days = days.filter(day => day.moment > now)
		   		.map((day, i) => {
		    	return <UI.common.dateEvents times={day.times} key={i} date={day.date} />;
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