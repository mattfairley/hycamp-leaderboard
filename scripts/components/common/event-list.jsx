UI.common.eventList = React.createClass({
	render() {
		var event = this.props.event;
		var endTime = moment(event.time).add(this.props.event.duration, 'm').format('h:mma');
		var parsedTime = moment(event.time).format('MMM DD h:mm');
		return (
			<div className="event-list">
				{event.name}
				{event.location}
				{endTime}
			</div>
		);
	}
});