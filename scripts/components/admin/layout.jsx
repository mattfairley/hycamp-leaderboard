UI.admin.layout = React.createClass({

	getInitialState() {
		return {title: 'HYCamp Admin'};
	},

	// componentDidMount: function() {
	// 	var self = this;

	// },

	render() {
		return <div className="page-wrapper">
			<header>

				<div className="icon icon-small icon-mono"><UI.common.icon /></div>
				<h1 className="site-title">{this.state.title}</h1>
				<UI.admin.nav />
			</header>
			<UI.admin.container />
			<div id="modal" className="modal"></div>
		</div>;
	}

});