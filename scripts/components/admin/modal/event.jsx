if (typeof(UI) === 'undefined') var UI = {};
if (typeof(UI.admin) === 'undefined') UI.admin = {};
if (typeof(UI.admin.modal) === 'undefined') UI.admin.modal = {};

UI.admin.modal.event = {

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

	close() {
		var modal = document.getElementById('modal');
		HYC.removeClass(modal, 'is-visible');
		modal.removeEventListener('click');
		React.unmountComponentAtNode(modal);
	},

	element: React.createClass({

		getInitialState: function() {
			return {
				message: null,
				messageType: null
			};
		},

		componentWillMount: function() {

		},

		closeModal: function() {
			UI.admin.modal.cabin.close();
		},

		deleteEvent(e) {
			e.preventDefault();
			var self = this;
			HYC.data.events.delete(this.props.id).then(function(res, data){
    			self.setState({
    				message: 'Event successfully deleted',
    				messageType: 'error'
    			});
    			//TODO show successful delete message
    		}).catch(function(err){
    			console.error('Error deleting event', err);
    		});
		},

		editEvent(e) {
			e.preventDefault();
	
			var self = this;
			var form = document.getElementById('form');
			var id = this.props.id;
			var name = document.getElementById('name').value;
			var location  = document.getElementById('location').value;
			var description  = document.getElementById('description').value;
			var time  = document.getElementById('time').value;
			var data = {
				name: name,
				location: location,
				description: description,
				time: time
			};
			HYC.data.events.edit(id, data).then(function(res, data){
    			self.setState({
    				message: 'Event successfully updated',
    				messageType: 'success'
    			});
    			//TODO show successful edit message
    		}).catch(function(err){
    			console.error('Error getting event list', err);
    		});
		},

		addEvent(e) {
			e.preventDefault();
	
			var self = this;
			var name = document.getElementById('name').value;
			var location  = document.getElementById('location').value;
			var description  = document.getElementById('description').value;
			var time  = document.getElementById('time').value;
			var data = {
				name: name,
				location: location,
				description: description,
				time: time
			};
			HYC.data.events.add(data).then(function(res, data){
    			self.setState({
    				message: 'Added event successfully',
    				messageType: 'success'
    			});
    			//TODO show successful add message
    		}).catch(function(err){
    			console.error('Error getting event list', err);
    		});
		},

		render: function() {
			var headerText = this.props.id ? 'Edit Event' : 'Add Event';

			return (
				<div className="modal__wrapper">
					<div className="modal__container">
					<i className="fa fa-times" onClick={this.closeModal}></i>
					<h2 className="modal__header">{headerText}</h2>
					{
						this.state.message ?
						<p className={'modal__message ' + this.state.messageType}>{this.state.message}</p>
						:
						null
					}
					<form className="form" id="form">
						<label for="name" className="form__label">Name
							<input type="text" className="form__input" name="name" id="name"  defaultValue={this.props.event.name}/>
						</label>
						<label for="location" className="form__label">Location
							<input type="text" className="form__input" name="location" id="location"  defaultValue={this.props.event.location} />
						</label>
						<label for="members" className="form__label">Members
							<textarea className="form__input" name="members" id="members" defaultValue={this.props.event.members} />
							
						</label>
						<label for="location" className="form__label">Time
							<input type="text" className="form__input" name="time" id="time"  defaultValue={this.props.event.time} />
						</label>
						{this.props.id ?
							<div>
								<button onClick={this.editEvent} className="btn btn-blue">Edit
								</button>
								<button onClick={this.deleteEvent} className="btn btn-red">Delete
								</button>
							</div>
						:
							<div>
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