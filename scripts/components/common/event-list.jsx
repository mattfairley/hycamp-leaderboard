UI.common.eventList = React.createClass({
	render() {
		var event = this.props.event;
		return (
			<div className="event-list">
				{event.name}
			</div>
		);
	}
});