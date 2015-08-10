if (typeof(UI) === 'undefined') var UI = {};
if (typeof(UI.admin) === 'undefined') UI.admin = {};
if (typeof(UI.admin.page) === 'undefined') UI.admin.page = {};

UI.admin.page.cabins = {
	register: function(){
        console.info('[UI.admin.page.cabins] register route');
        HYC.router.rr.add([{ path: '/cabins', handler: UI.admin.page.cabins.render }]);
    },

    render: function(container, params){
        console.info('[UI.admin.page.cabins] rendering page');
        React.render(<UI.admin.page.cabins.element />, container);
        HYC.events.publish('sectionChange', {section: 'cabins'});
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
    		var cabins = this.state.cabins.map(function(cabin) {
                return <UI.admin.cabin cabin={cabin} />
            });

            return (
                <div>
                    <h2>Cabins</h2>
                    {cabins}
                </div>
            );
    	}
    })
};