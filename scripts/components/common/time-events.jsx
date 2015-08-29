UI.common.timeEvents = React.createClass({
	render() {

		var title;
		if (this.props.events[0].happening) {
			title = 'Now';
		} else {
			title = this.props.time;
		}

		var events = this.props.events.map((event, i) => {
			return <UI.common.eventList event={event} key={i}/>;
		});

		return (
			<div className="event-list__time">
				<h4 className="event-list__time__title">{title}</h4>
				{events}
			</div>
		);
	}
});