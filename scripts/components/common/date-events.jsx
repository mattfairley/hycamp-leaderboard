UI.common.dateEvents = React.createClass({
	render() {

		var times = this.props.times.map(time => {
			return <UI.common.timeEvents time={time.time} moment={time.moment} events={time.events} key={time.time} />;
		});

		return (

			<div className="day">
				<h3 className="day__title">{this.props.date}</h3>
				{times}
			</div>
		);
	}
});