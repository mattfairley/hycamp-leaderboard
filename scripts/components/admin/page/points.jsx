UI.admin.page.points = {
	register(){
        console.info('[UI.admin.page.points] register route');
        HYC.router.rr.add([{ path: '/', handler: UI.admin.page.points.render }]);
    },

    render(container, params){
        console.info('[UI.admin.page.points] rendering page');
        React.render(<UI.admin.page.points.element />, container);
        HYC.events.publish('sectionChange', {section: 'Points'});
    },

    element: React.createClass({
    	getInitialState() {
    		return {cabins: [], message: null, messageType: null};
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

    	removeMessage() {
    		this.setState({message: null, messageType: null});
    		console.log(this.state);
    		window.clearTimeout(this.messageTimer);
    	},

    	componentWillUnmount() {
    		this.listUpdated.remove();
    	},

    	render() {
    		console.log('Rendering', this.state.cabins);
    		var cabin = this.state.cabins.map(cabin => {
    			return <UI.admin.cabinList type="add" cabin={cabin} key={cabin._id} />;
    		});
    		return (
    			<div className="admin-wrapper">
    				{
						this.state.message ?
						<p className={'modal__message ' + this.state.messageType}>{this.state.message}</p>
						:
						null
					}
    				<ul className="points-list">
    					{cabin}
    				</ul>
    			</div>
    			);
    	}
    })
};