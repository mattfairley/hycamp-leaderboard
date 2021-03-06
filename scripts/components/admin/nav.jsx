UI.admin.nav = React.createClass({

	subSectionChange: null,
	navItems: [
		{text: 'Points', icon: 'icon-trophy', link: '#'},
		{text: 'Cabins', icon: 'icon-bed', link: '#cabins'},
		{text: 'Events', icon: 'icon-calendar', link: '#events'}
	],

	getInitialState: function(){
		return {
			currentSection: 'Points'
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
					var style = 'navmenu__item';
					if (self.state.currentSection === item.text)
						style += ' is-active';
					return <li className={style} key={i}>
						<a href={item.link} className="navmenu__link"><i className={'navmenu__icon ' + item.icon}></i><span>{item.text}</span></a>
						</li>;
				})
				}

			</ul>

		);
	}



});