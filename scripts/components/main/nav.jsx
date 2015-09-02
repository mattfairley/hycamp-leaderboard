UI.main.nav = React.createClass({

	subSectionChange: null,
	navItems: [
		{text: 'Events', icon: 'icon-calendar', link: '#'},
		{text: 'Feed', icon: 'icon-camera', link: '#feed'},
		{text: 'Leaderboard', icon: 'icon-trophy', link: '#leaderboard'}
	],

	getInitialState: function(){
		return {
			currentSection: 'Leaderboard'
		};
	},

	sectionChanged: function(info){
		console.log('sectionChange registered');
		this.setState({currentSection: info.section});
	},

	componentWillMount: function(){
		this.subSectionChange = HYC.events.subscribe('sectionChange', this.sectionChanged);
	},

	componentWillUnmount: function(){
		this.subSectionChange.remove();
	},

	render: function(){
		var self = this;

		return(
			<ul className="navmenu">
				{this.navItems.map((item, i) => {
					var leaderboard = item.text === 'Leaderboard' ? true : false;
					var style = 'navmenu__item';
					if (self.state.currentSection === item.text)
						style += ' is-active';
					return <li className={style} key={i}>
						<a href={item.link} className="navmenu__link">
						{/*leaderboard ?
							<div className="icon icon-small"><UI.common.icon /></div>
							:
						*/}
							<i className={'navmenu__icon ' + item.icon}></i>
							<span>{item.text}</span>
						</a>
						</li>;
				})
				}

			</ul>

		);
	}



});