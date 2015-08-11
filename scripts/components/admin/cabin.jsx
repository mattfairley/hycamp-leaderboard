if (typeof(UI) === 'undefined') var UI = {};
if (typeof(UI.admin) === 'undefined') UI.admin = {};

UI.admin.cabin = React.createClass({

	openModal() {
		UI.admin.modal.cabin.open(this.props.cabin._id, this.props.cabin);
	},

	render: function() {
		return (
			<div>{this.props.cabin.name}{this.props.cabin.points}<i className="fa fa-edit" onClick={this.openModal}></i></div>
		);
	}

});