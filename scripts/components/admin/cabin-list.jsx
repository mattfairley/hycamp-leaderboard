if (typeof(UI) === 'undefined') var UI = {};
if (typeof(UI.admin) === 'undefined') UI.admin = {};

UI.admin.cabinList = React.createClass({

	openModal() {
		UI.admin.modal.cabin.open(this.props.cabin._id, this.props.cabin);
	},

	render: function() {
		var cabin = this.props.cabin;
		return (
			<div className="data-row">
				<div className="data-row__icon-container">
					<i className={'fa ' + cabin.icon}></i>
				</div>
				<div className="data-row__info">
					<h4 className="data-row__title">{cabin.name}</h4>
					<p className="data-row__points">{cabin.points} points</p>
				</div>
				<div className="data-row__icon-container data-row__icon-container--edit" onClick={this.openModal}>
					<i className="fa fa-pencil"></i>
				</div>
			</div>
		);
	}

});