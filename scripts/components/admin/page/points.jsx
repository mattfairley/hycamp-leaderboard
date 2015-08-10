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
    		return {cabins: []};
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
    		return (
    			<div className="cabin-list">
    				<h2>Points</h2>
    			</div>
    			);
    	}
    })
};