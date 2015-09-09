UI.main.layout = React.createClass({

	getInitialState() {
		return {title: 'BootCampfire'};
	},

	// componentDidMount: function() {
	// 	var self = this;

	// },

	render() {
		return <div className="page-wrapper">
			<header className="main-header">
				<UI.common.icon size="small" style="mono" />
				<h1 className="site-title">{this.state.title}</h1>
				<UI.main.nav />
			</header>
			<div className="logo-topbar"><UI.common.icon size="small" style="mono" /></div>
			<UI.main.container />
		
		</div>;
	}

});