UI.common.picture = React.createClass({

	render() {
		var picture = this.props.picture;

		var isVideo = picture.type === 'video' ? true : false;

		return (
			<div className="picture">
				<div className="picture__title">

					<div className="picture__profile">
						<img src={picture.profilePic} className="picture__profile-img"/>
					</div>
					<a className="picture__user" href={'http://instagram.com/' + picture.user + '/'} title={picture.user}>
						{picture.user}
					</a>
				</div>
				<div className="picture__container">
					<a className="picture__link" href={picture.link} target="_blank">
						{isVideo ?
							<span className="picture__video">Play in new tab</span>
							:
							null
						}
						<img className="picture__img" src={picture.image} title="View on instagram" />
					</a>
				</div>
				<div className="picture__footer"><p className="picture__footer-text">{picture.caption}</p></div>
			</div>
		);
	}
});