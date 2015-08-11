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
        HYC.events.publish('sectionChange', {section: 'Cabins'});
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

    	openModal: function(e) {
    		UI.admin.modal.cabin.open();
    	},


    	render: function() {
    		console.log('Rendering', this.state.cabins);
    		var cabins = this.state.cabins.map(function(cabin) {
                return <UI.admin.cabin cabin={cabin} id={cabin._id} />;
            });


            return (
                <div className="admin-wrapper">
                    <h2>Cabins</h2>
                    <button className="btn btn-blue" onClick={this.openModal} >Add new</button>
    	            <ul className="cabin-list">
    	    	        {cabins}
        	        </ul>
                </div>
            );
    	}
    })
};