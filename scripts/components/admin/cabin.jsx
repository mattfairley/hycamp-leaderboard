if (typeof(UI) === 'undefined') var UI = {};
if (typeof(UI.admin) === 'undefined') UI.admin = {};

UI.admin.cabin = React.createClass({

	render: function() {
		return (
			<div>{this.props.cabin.name}{this.props.cabin.points}</div>
		)
	}

});