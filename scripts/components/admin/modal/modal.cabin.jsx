UI.admin.modal.cabin = {


	// Opens the modal, passing in a cabin id and the cabin data itself
	open(id, cabin) {
		var self = this;
		cabin = cabin || {};
		var modal = document.getElementById('modal');
		HYC.addClass(modal, 'is-visible');
		React.render(<UI.admin.modal.cabin.element cabin={cabin} id={id}/>, modal);
		// close on click outside container
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
			UI.admin.modal.cabin.close();
		},

		// Delete the cabin
		deleteCabin(e) {
			e.preventDefault();
			var self = this;
			HYC.data.cabins.delete(this.props.id).then(function(res, data){
    			HYC.events.publish('cabinChanged', {
    				message: 'Cabin successfully deleted',
    				type: 'success'
    			});
    			self.closeModal();
    			//TODO show successful delete message
    		}).catch(function(err){
    			self.setState({message: message, messageType: error});
    		});
		},

		// Edit cabin, passing in the various data items to the api
		editCabin(e) {
			e.preventDefault();
	
			var self = this;
			var form = document.getElementById('form');
			var id = this.props.id;
			var name = document.getElementById('name').value;
			var icon = document.getElementById('icon').value;
			var points = Number(document.getElementById('points').value);
			var members = document.getElementById('members').value.split(',');
			members = members.map(member => member.trim());
			var data = {
				name: name,
				icon: icon,
				members: members,
				points: points
			};
			HYC.data.cabins.edit(id, data).then(function(res, data){
    			self.setState({
    				message: 'Cabin successfully updated',
    				messageType: 'success'
    			});
    			HYC.events.publish('cabinChanged', {});
    		}).catch(function(err){
    			self.setState({message: message, messageType: error});
    		});
		},

		// Add cabin, passing in the values and pushing to the .add api endpoint
		addCabin(e) {
			e.preventDefault();
	
			var self = this;
			var name = document.getElementById('name').value;
			var icon = document.getElementById('icon').value;

			var members = document.getElementById('members').value.split(',');
			members = members.map(member => member.trim());
			var data = {
				name: name,
				icon: icon,
				members: members
			};
			HYC.data.cabins.add(data).then(function(res, data){
				// Publish the success message that will be passed back to the cabins page
    			HYC.events.publish('cabinChanged', {
    				message: 'Cabin successfully added',
    				type: 'success'
    			});
    			self.closeModal();
    		}).catch(function(err){
    			self.setState({message: message, messageType: error});
    		});
		},

		render() {
			var headerText = this.props.id ? 'Edit Cabin' : 'Add Cabin';

			return (
				<div className="modal__wrapper">
					<div className="modal__container">
					<span className="modal__close" onClick={this.closeModal}>&times;</span>
					<div className="modal__header">
						<h2 className="modal__title">{headerText}</h2>
					</div>
					{/* If there is a message, render the message paragraph */}
					{
						this.state.message ?
						<p className={'modal__message ' + this.state.messageType}>{this.state.message}</p>
						:
						null
					}
					<form className="form" id="form">
						<label htmlFor="name" className="form__label">Name
							<input type="text" className="form__input" name="name" id="name"  defaultValue={this.props.cabin.name}/>
						</label>
						<label htmlFor="icon" className="form__label">Icon
							<input type="text" className="form__input" name="icon" id="icon"  defaultValue={this.props.cabin.icon} />
						</label>
						{this.props.id ?
							<label htmlFor="points" className="form__label">Points
								<input type="number" min="0" step="5" className="form__input" name="points" id="points" defaultValue={this.props.cabin.points} />
								
							</label>

							:
							null

						}
						<label htmlFor="members" className="form__label">Members (comma separated)
							<textarea className="form__input" name="members" id="members" defaultValue={this.props.cabin.members} />
							
						</label>
						{this.props.id ?
							<div className="form__btn-container">
								<button onClick={this.editCabin} className="btn btn-blue">Save
								</button>
								<button onClick={this.deleteCabin} className="btn btn-red">Delete
								</button>
							</div>
						:
							<div className="form__btn-container">
								<button onClick={this.addCabin} className="btn btn-blue">Add
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