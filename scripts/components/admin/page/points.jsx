if (typeof(UI) === 'undefined') var UI = {};
if (typeof(UI.admin) === 'undefined') UI.admin = {};
if (typeof(UI.admin.page) === 'undefined') UI.admin.page = {};

UI.admin.page.points = {
	register: function(){
        console.info('[UI.admin.page.points] register route');
        HYC.router.rr.add([{ path: '/', handler: UI.admin.page.points.render }]);
    },

    render: function(container, params){
        console.info('[UI.admin.page.points] rendering page');
        React.render(<UI.admin.page.points.element />, container);
        HYC.events.publish('sectionChange', {section: 'Points'});
    },

    element: React.createClass({
    	getInitialState: function() {
    		return {cabins: [], message: null, messageType: null};
    	},

    	componentWillMount: function() {
    		var self = this;
    		HYC.data.cabins.list().then(function(res, data){
    			self.setState({cabins: data.results});
    		}).catch(function(err){
    			console.error('Error getting cabin list', err);
    		});
    	},

    	render: function() {
    		console.log('Rendering', this.state.cabins);
    		var cabin = this.state.cabins.map(cabin => {
    			return <UI.admin.cabinList type="add" cabin={cabin} id={cabin._id} />;
    		});
    		return (
    			<div className="cabin-list">
    				<div className="admin__header">
    					<h2>Points</h2>
    				</div>
    				<ul className="points-list">
    					{cabin}
    				</ul>
    			</div>
    			);
    	}
    })
};