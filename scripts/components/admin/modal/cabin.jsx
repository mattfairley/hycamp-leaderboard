if (typeof(UI) === 'undefined') var UI = {};
if (typeof(UI.admin) === 'undefined') UI.admin = {};
if (typeof(UI.admin.modal) === 'undefined') UI.admin.modal = {};

UI.admin.modal.cabin = {

	open(id, cabin) {
		cabin = cabin || {};
		var modal = document.getElementById('modal');
		React.render(<UI.admin.modal.cabin.element cabin={cabin} id={id}/>, modal);	
	},

	close() {
		var modal = document.getElementById('modal');
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

		deleteCabin(e) {
			e.preventDefault();
			var self = this;
			HYC.data.cabins.delete(this.props.id).then(function(res, data){
    			self.setState({
    				message: 'Cabin successfully deleted',
    				messageType: 'error'
    			});
    			//TODO show successful delete message
    		}).catch(function(err){
    			console.error('Error deleting cabin', err);
    		});
		},

		editCabin(e) {
			e.preventDefault();
	
			var self = this;
			var form = document.getElementById('form');
			var id = this.props.id;
			var name = document.getElementById('name').value;
			var icon = document.getElementById('icon').value;
			var members = document.getElementById('members').value.split(',');
			members = members.map(member => member.trim());
			var data = {
				name: name,
				icon: icon,
				members: members
			};
			HYC.data.cabins.edit(id, data).then(function(res, data){
    			self.setState({
    				message: 'Cabin successfully updated',
    				messageType: 'success'
    			});
    			//TODO show successful edit message
    		}).catch(function(err){
    			console.error('Error getting cabin list', err);
    		});
		},

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
    			self.setState({
    				message: 'Added cabin successfully',
    				messageType: 'success'
    			});
    			//TODO show successful add message
    		}).catch(function(err){
    			console.error('Error getting cabin list', err);
    		});
		},

		render: function() {
			var headerText = this.props.id ? 'Edit Cabin' : 'Add Cabin';

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
							<input type="text" className="form__input" name="name" id="name"  defaultValue={this.props.cabin.name}/>
						</label>
						<label for="icon" className="form__label">Icon
							<input type="text" className="form__input" name="icon" id="icon"  defaultValue={this.props.cabin.icon} />
						</label>
						<label for="members" className="form__label">Members
							<textarea className="form__input" name="members" id="members" defaultValue={this.props.cabin.members} />
							
						</label>
						{this.props.id ?
							<div>
								<button onClick={this.editCabin} className="btn btn-blue">Edit
								</button>
								<button onClick={this.deleteCabin} className="btn btn-red">Delete
								</button>
							</div>
						:
							<div>
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