UI.admin.modal.event = {

	// Opens the modal, passing in an event id and the event data itself (both optional params)
	open(id, event) {
		event = event || {};
		var modal = document.getElementById('modal');
		HYC.addClass(modal, 'is-visible');
		React.render(<UI.admin.modal.event.element event={event} id={id}/>, modal);	
		modal.addEventListener('click', function(e){
			if (e.target === modal) {
				self.close();
			}
		});
	},

	// Closing the modal, which will remove the visible classes and unmount the component
	close() {
		var modal = document.getElementById('modal');
		HYC.removeClass(modal, 'is-visible');
		modal.removeEventListener('click');
		React.unmountComponentAtNode(modal);
	},

	element: React.createClass({

		// Set initial state, which is a message (string) and a messageType (error or success)
		getInitialState() {
			return {
				message: null,
				messageType: null
			};
		},

		// Close the modal
		closeModal() {
			UI.admin.modal.event.close();
		},

		// Delete the event
		deleteEvent(e) {
			e.preventDefault();
			var self = this;
			HYC.data.events.delete(this.props.id).then(function(res, data){
    			HYC.events.publish('eventChanged', {
    				message: 'Event successfully deleted',
    				type: 'success'
    			});
    			self.closeModal();
    			//TODO show successful delete message
    		}).catch(function(err){
    			self.setState({message: message, messageType: error});
    		});
		},

		// Edit the event, passing in the appropriate data items to the API
		editEvent(e) {
			e.preventDefault();
	
			var self = this;
			var form = document.getElementById('form');
			var id = this.props.id;
			var name = document.getElementById('name').value;
			var location  = document.getElementById('location').value;
			var description  = document.getElementById('description').value;
			var duration = document.getElementById('duration').value;
			var time  = document.getElementById('time').value;
			var data = {
				name: name,
				location: location,
				description: description,
				duration: duration,
				time: time
			};
			HYC.data.events.edit(id, data).then(function(res, data){
    			self.setState({
    				message: 'Event successfully updated',
    				messageType: 'success'
    			});
    			//TODO show successful edit message
    		}).catch(function(err){
    			self.setState({message: message, messageType: error});
    		});
		},

		// Add cabin, passing in the values and pushing to the .add api endpoint
		addEvent(e) {
			e.preventDefault();
	
			var self = this;
			var name = document.getElementById('name').value;
			var location  = document.getElementById('location').value;
			var description  = document.getElementById('description').value;
			var time  = document.getElementById('time').value;
			var duration = document.getElementById('duration').value;
			var data = {
				name: name,
				location: location,
				description: description,
				duration: duration,
				time: time
			};
			HYC.data.events.add(data).then(function(res, data){
				// Publish the success message that will be passed back to the events page
    			HYC.events.publish('eventChanged', {
    				message: 'Event successfully added',
    				type: 'success'
    			});
    			self.closeModal();
    		}).catch(function(err){
    			self.setState({message: message, messageType: error});
    		});
		},

		render() {
			var parsedTime = this.props.id ? moment(this.props.event.time).format('MMM DD HH:mm') : null;
			var headerText = this.props.id ? 'Edit Event' : 'Add Event';

			return (
				<div className="modal__wrapper">
					<div className="modal__container">
					<span className="modal__close" onClick={this.closeModal}>&times;</span>
					<div className="modal__header">
						<h2 className="modal__title">{headerText}</h2>
					</div>
					{
						this.state.message ?
						<p className={'modal__message ' + this.state.messageType}>{this.state.message}</p>
						:
						null
					}
					<form className="form" id="form">
						<label htmlFor="name" className="form__label">Name
							<input type="text" className="form__input" name="name" id="name"  defaultValue={this.props.event.name}/>
						</label>
						<label htmlFor="location" className="form__label">Location
							<input type="text" className="form__input" name="location" id="location"  defaultValue={this.props.event.location} />
						</label>
						<label htmlFor="duration" className="form__label">Duration (minutes)
							<input type="text" className="form__input" name="duration" id="duration"  defaultValue={this.props.event.duration} />
						</label>
						<label htmlFor="description" className="form__label">Description
							<textarea className="form__input" name="description" id="description" defaultValue={this.props.event.description} />
							
						</label>
						<label htmlFor="location" className="form__label">Time (format: Sep 11 20:00)
							<input type="text" className="form__input" name="time" id="time"  defaultValue={parsedTime} />
						</label>
						{this.props.id ?
							<div className="form__btn-container">
								<button onClick={this.editEvent} className="btn btn-blue">Save
								</button>
								<button onClick={this.deleteEvent} className="btn btn-red">Delete
								</button>
							</div>
						:
							<div className="form__btn-container">
								<button onClick={this.addEvent} className="btn btn-blue">Add
								</button>
							</div>
						}
					</form>
					</div>
				</div>
			);
		}
	})
};