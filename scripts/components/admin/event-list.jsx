UI.admin.eventList = React.createClass({

	openModal() {
		UI.admin.modal.event.open(this.props.event._id, this.props.event);
	},

	render() {
		var parsedTime = moment(this.props.event.time).format('MMM DD HH:mm');
		return (

			<div className='data-row'>

				<div className="data-row__title--event">{this.props.event.name}</div>
				<div className="data-row__info">
					{this.props.event.location}{parsedTime}
				</div>

				<div className="data-row__icon-container data-row__icon-container--edit" onClick={this.openModal}>
	    			<i className="fa fa-pencil"></i>
				</div>
			</div>
		);
	}

});