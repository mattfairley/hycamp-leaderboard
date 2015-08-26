UI.common.eventList = React.createClass({
	render() {
		var event = this.props.event;
		var endTime = moment(event.time).add(this.props.event.duration, 'm').format('h:mma');
		var parsedTime = moment(event.time).format('MMM DD h:mm');
		return (
			<div className="event">
				<div className="event__heading">
					<h4 className="event__title">{event.name}</h4>
					<p className="event__location">{event.location}</p>
				</div>
				<p className="event__description">{event.description}</p>
				{/*endTime*/}
			</div>
		);
	}
});