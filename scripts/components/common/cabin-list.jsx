UI.common.cabinList = React.createClass({
	
	getInitialState() {
		return {};
	},

	render() {
		var cabin = this.props.cabin;
		console.log(this.props);
		return (
			<div className={'data-row '+this.props.type} id={cabin._id}>
				<div className="data-row__icon-container data-row__icon-container--rank">
					<span className="data-row__rank">{this.props.rank}</span>
				</div>
				<div className="data-row__icon-container">
					<i className={'fa ' + cabin.icon}></i>
				</div>
				<div className="data-row__info">
					<h4 className="data-row__title">{cabin.name}</h4>
					<p className="data-row__points">{cabin.points} points</p>
				</div>
					
			</div>
		);
	}
});