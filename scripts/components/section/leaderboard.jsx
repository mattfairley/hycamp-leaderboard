UI.section.leaderboard = {
	register(){
        console.info('[UI.section.leaderboard] register route');
        HYC.router.rr.add([{ path: '/', handler: UI.section.leaderboard.render }]);
    },

    render(container, params) {
    	console.info('[UI.section.leaderboard] rendering section');
    	React.render(<UI.section.leaderboard.element />, container);
    	HYC.events.publish('sectionChange', {section: 'Leaderboard'});
    },

    element: React.createClass({
    	getInitialState() {
    		return {cabins: []};
    	},

    	componentWillMount() {
    		var self = this;
    		HYC.data.cabins.list().then(function(res, data){
    			self.setState({cabins: data.results});
    		}).catch(function(err){
    			console.error('Error getting cabin list', err);
    		});
    	},

    	render() {
    		console.log('Rendering', this.state.cabins);
    		var cabins = this.state.cabins.map(cabin => {
    			return <UI.common.cabinList cabin={cabin} key={cabin._id} />;
    		});

    		return (
    			<div className="section-wrapper">
    				<ul className="cabin-list">
    					{cabins}
    				</ul>
    			</div>

    		);
    	}
    })

};