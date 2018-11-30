const errorMsg = function(error) {
	const err =
		error.message && error.message.includes('timeout')
			? 'Connection timed out'
			: error.response.data.message;
	this.setState({ error: err });
};

export default errorMsg;
