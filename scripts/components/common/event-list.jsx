UI.common.eventList = React.createClass({
	render() {
		var event = this.props.event;
		var parsedTime = moment(event.time).format('MMM DD HH:mm');
		return (
			<div className="event-list">
				{event.name}{parsedTime}
			</div>
		);
	}
});