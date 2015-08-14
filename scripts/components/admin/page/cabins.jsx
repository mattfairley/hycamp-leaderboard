if (typeof(UI) === 'undefined') var UI = {};
if (typeof(UI.admin) === 'undefined') UI.admin = {};
if (typeof(UI.admin.page) === 'undefined') UI.admin.page = {};

UI.admin.page.cabins = {
	register(){
        console.info('[UI.admin.page.cabins] register route');
        HYC.router.rr.add([{ path: '/cabins', handler: UI.admin.page.cabins.render }]);
    },

    render(container, params){
        console.info('[UI.admin.page.cabins] rendering page');
        React.render(<UI.admin.page.cabins.element />, container);
        HYC.events.publish('sectionChange', {section: 'Cabins'});
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

    		this.listUpdated = HYC.events.subscribe('cabinChanged', this.updateList);

    	},

    	updateList(message) {
    		var self = this;
    		HYC.data.cabins.list().then(function(res, data){
    			self.setState({cabins: data.results, message: message.message, messageType: message.type});
    			self.messageTimer = window.setTimeout(self.removeMessage, 2000);
    		}).catch(function(err){
    			console.error('Error getting cabin list', err);
    		});
    	},

    	componentWillUnmount() {
    		this.listUpdated.remove();
    	},

    	openModal(e) {
    		UI.admin.modal.cabin.open();
    	},

    	removeMessage() {
    		this.setState({cabins: this.state.cabins});
    		window.clearTimeout(this.messageTimer);
    	},


    	render() {
    		console.log('Rendering', this.state.cabins);
    		var cabins = this.state.cabins.map(function(cabin) {
                return <UI.admin.cabinList cabin={cabin} key={cabin._id} type="edit" />;
            });


            return (
                <div className="admin-wrapper">
                    <div className="admin__header">
                    	<h2>Cabins</h2>
                    	<button className="btn btn-blue" onClick={this.openModal} >Add new</button>
                    </div>
                    {
						this.state.message ?
						<p className={'modal__message ' + this.state.messageType}>{this.state.message}</p>
						:
						null
					}
    	            <ul className="cabin-list">
    	    	        {cabins}
        	        </ul>
                </div>
            );
    	}
    })
};