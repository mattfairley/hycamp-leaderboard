if (typeof(UI) === 'undefined') var UI = {};
if (typeof(UI.admin) === 'undefined') UI.admin = {};

UI.admin.eventList = React.createClass({

	openModal() {
		UI.admin.modal.event.open(this.props.event._id, this.props.event);
	},

	render: function() {
		return (
			<div>{this.props.event.name}{this.props.event.points}<i className="fa fa-edit" onClick={this.openModal}></i></div>
		);
	}

});