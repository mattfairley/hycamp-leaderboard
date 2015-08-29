UI.common.dateEvents = React.createClass({
	render() {

		// Filter out events that have happened
		var times = this.props.times.filter((time) => {
			return !time.events[0].happened;
		}).map((time, i) => {
			return <UI.common.timeEvents time={time.time} moment={time.moment} events={time.events} key={i} />;
		});

		return (

			<div className="event-list__day">
				<h3 className="event-list__day__title">{this.props.date}</h3>
				{times.length ?
					times
					:
					<div className="event no-event">Nothing else planned today! Get to bed!</div>
				}
			</div>
		);
	}
});