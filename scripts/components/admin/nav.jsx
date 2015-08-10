if (typeof(UI) === 'undefined') var UI = {};
if (typeof(UI.admin) === 'undefined') UI.admin = {};

UI.admin.nav = React.createClass({

	subSectionChange: null,
	navItems: [
		{text: 'Points', link: '#'},
		{text: 'Cabins', link: '#cabins'},
		{text: 'Events', link: '#events'}
	],

	getInitialState: function(){
		return {
			currentSection: 'Home'
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
				{this.navItems.map((item) => {
					var style = 'navmenu__item';
					if (self.state.currentSection === item.text)
						style += ' is-active';
					return <li className={style}><a href={item.link} className="navmenu__link">{item.text}</a></li>;
				})
				}

			</ul>

		);
	}



});