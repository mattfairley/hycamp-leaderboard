UI.main.layout = React.createClass({

	getInitialState() {
		return {title: 'HackerYou.camp'};
	},

	// componentDidMount: function() {
	// 	var self = this;

	// },

	render() {
		return <div className="page-wrapper">
			<header>
				<div className="icon icon-small icon-mono"><UI.common.icon /></div>
				<h1 className="site-title">{this.state.title}</h1>
				<UI.main.nav />
			</header>
			<UI.main.container />
		
		</div>;
	}

});