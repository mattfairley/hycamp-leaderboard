UI.admin.layout = React.createClass({

	getInitialState() {
		return {title: 'Bootcampfire Admin'};
	},

	// componentDidMount: function() {
	// 	var self = this;

	// },

	render() {
		return <div className="page-wrapper">
			<header>

				<UI.common.icon size="small" style="mono" />
				<h1 className="site-title">{this.state.title}</h1>
				<UI.admin.nav />
			</header>
			<UI.admin.container />
			<div id="modal" className="modal"></div>
		</div>;
	}

});