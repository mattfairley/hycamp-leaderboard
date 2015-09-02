var login = {}

document.addEventListener('DOMContentLoaded', function(){
	React.render(<login.main />, document.getElementById('login'));
});

login.main = React.createClass({
	getInitialState() {
		return {
			username: '',
			password: ''
		}
	},

	login() {

	},

	render() {
		return (
			<div />
		)
	}
});