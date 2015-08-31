UI.section.feed = {
	register(){
        console.info('[UI.section.feed] register route');
        HYC.router.rr.add([{ path: '/feed', handler: UI.section.feed.render }]);
    },

    render(container, params) {
    	console.info('[UI.section.feed] rendering section');
    	React.render(<UI.section.feed.element />, container);
    	HYC.events.publish('sectionChange', {section: 'Feed'});
    },

    element: React.createClass({

    	getInitialState() {
    		return {
    			min: null,
    			max: null,
    			results: [],
    			loading: true
    		};
    	},

    	componentWillMount() {
    		var self = this;
    		self.setState({
    			loading: true
    		});
    		HYC.data.feed.list().then(function(res, data){
    			console.log(data);
    			self.setState({
    				min: data.more.min_tag_id,
    				max: data.more.next_max_tag_id,
    				results: data.results,
    				loading: false
    			});
    		}).catch(function(err){
    			console.log(err);
    		});
    	},

    	getMore() {
    		var self = this;
    		var existingFeed = self.state.results;
    		self.setState({
    			loading: true
    		});
    		HYC.data.feed.more(self.state.min, self.state.max).then(function(res, data){
    			console.log(data);
    			self.setState({
    				min: data.more.min_tag_id,
    				max: data.more.next_max_tag_id,
    				results: existingFeed.concat(data.results),
    				loading: false
    			});
    		}).catch(function(err){
    			console.log(err);
    		});
    	},

    	render() {
    		console.log('Rendering pictures', this.state.results);

    		var pictures = this.state.results.map((picture, i) => {

    			var newPic = {
    				caption: picture.caption.text,
    				image: picture.images.standard_resolution.url,
    				imageSmall: picture.images.low_resolution.url,
    				link: picture.link,
    				user: picture.user.username,
    				profilePic: picture.user.profile_picture
    			};

    			return <UI.common.picture key={i} picture={newPic} /> ;
    		});



    		return (
    			<div className="section-wrapper">
    				<div className="picture-feed">
    					{pictures}
    					{
    						this.state.loading ?
    						<UI.common.loader />
    						:
    						this.state.max ?
    						<div className="load-more"><button className="load-more__button" onClick={this.getMore}>Load more...</button></div>
    						
    						:
    						null
    					}
    				</div>
    			</div>
    		);
    	}
    })

};