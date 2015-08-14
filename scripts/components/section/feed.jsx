UI.section.feed = {
	register(){
        console.info('[UI.section.feed] register route');
        HYC.router.rr.add([{ path: '/feed', handler: UI.section.feed.render }]);
    },

    render(container, params) {
    	console.info('[UI.section.feed] rendering section');
    	React.render(<UI.section.feed.element />, container);
    	HYC.feed.publish('sectionChange', {section: 'Feed'});
    },

    element: React.createClass({
    	render() {
    		return (
    			<div className="feed">
    				<h2>Feed</h2>
    			</div>
    		);
    	}
    })

};