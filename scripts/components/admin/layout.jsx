if (typeof(UI) === 'undefined') var UI = {};
if (typeof(UI.admin) === 'undefined') UI.admin = {};

UI.admin.layout = React.createClass({

	getInitialState: function() {
		return {title: 'HYCamp Admin'};
	},

	// componentDidMount: function() {
	// 	var self = this;

	// },

	render: function() {
		return <div className="page-wrapper">
			<header>
				<h1 className="site-title">{this.state.title}</h1>
				<UI.admin.nav />
			</header>
			<UI.admin.container />
			<div id="modal" className="modal"></div>
		</div>;
	}

});