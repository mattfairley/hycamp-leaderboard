UI.admin.cabinList = React.createClass({

	getInitialState() {
		return {};
	},

	openModal() {
		UI.admin.modal.cabin.open(this.props.cabin._id, this.props.cabin);
	},

	addPoints() {
		var self = this;
		var pointsInput = document.getElementById(this.props.cabin._id+'number');
		console.log(pointsInput);
		var toadd = Number(pointsInput.value);
		console.log(toadd, this.props.cabin.points);
		var data = {points: this.props.cabin.points + toadd};
			HYC.data.cabins.edit(this.props.cabin._id, data).then(function(res, data){
				HYC.events.publish('cabinChanged',
					{type: 'success', message: 'Points successfully added'}
				);
    			pointsInput.value = null;
    		}).catch(function(err){
    			console.error('Error adding points', err);
    			self.setState({
    				messageType: 'error'
    			});
    		});
	},

	render: function() {
		var cabin = this.props.cabin;
		return (
			<div className={'data-row '+this.props.type} id={cabin._id}>
				<div className="data-row__icon-container">
					<i className={'fa ' + cabin.icon}></i>
				</div>
				<div className="data-row__info">
					<h4 className="data-row__title">{cabin.name}</h4>
					{this.props.type === 'edit' ? 
						<p className="data-row__points">{cabin.points} points</p>
						:
						null
					}
					{
						this.props.type === 'add' ?
						<label htmlFor="number" className="datarow__label">
    						<input className="data-row__input" step="5" min="0"type="number" name="number" id={cabin._id + 'number'}/>
    					</label>
    					:
    					null
					}
				</div>
				{
					this.props.type === 'add' ?
						<div className="data-row__icon-container data-row__icon-container--add" onClick={this.addPoints}>
							<i className="fa fa-plus"></i>
						</div>
    				:
	    				<div className="data-row__icon-container data-row__icon-container--edit" onClick={this.openModal}>
	    					<i className="fa fa-pencil"></i>
						</div>
					}
			</div>
		);
	}

});