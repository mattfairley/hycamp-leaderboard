UI.common.picture = React.createClass({
	render() {
		var photo = this.props.picture;
		return (
			<div className="img-wrapper">
				{photo.user}
			</div>
		);
	}
});