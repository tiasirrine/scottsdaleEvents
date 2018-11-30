const jwt = require('jsonwebtoken');

const createToken = (data, expiresIn) => {
	return new Promise((resolve, reject) => {
		jwt.sign(data, process.env.TOKEN_KEY, { expiresIn }, (err, token) => {
			if (err) reject(err);
			resolve(token);
		});
	});
};

module.exports = createToken;
