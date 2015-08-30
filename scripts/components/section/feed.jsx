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
    			results: []
    		};
    	},

    	componentWillMount() {
    		var self = this;
    		HYC.data.feed.list().then(function(res, data){
    			console.log(data);
    			self.setState({
    				min: data.more.min_tag_id,
    				max: data.more.max_tag_id,
    				results: data.results
    			});
    		}).catch(function(err){
    			console.log(err);
    		});
    	},

    	getMore() {
    		var self = this;
    		var existingFeed = self.state.results;
    		HYC.data.feed.more(self.state.min, self.state.max).then(function(res, data){
    			console.log(data);
    			self.setState({
    				min: data.more.min_tag_id,
    				max: data.more.max_tag_id,
    				results: existingFeed.concat(data.results)
    			});
    		}).catch(function(err){
    			console.log(err);
    		});
    	},

    	render() {
    		console.log('Rendering photos', this.state.results);

    		var photos = this.state.results.map((photo, i) => {
    			console.log(photo);
    			// pic.user = 

    			var pic = {
    				caption: photo.caption.text,
    				image: photo.images.standard_resolution.url,
    				link: photo.link,
    				user: photo.user.username
    			};

    			return <UI.common.picture key={i} picture={pic} /> ;
    		});



    		return (
    			<div className="section-wrapper">
    				<div className="photo-feed">
    					{photos}
    				</div>
    			</div>
    		);
    	}
    })

};