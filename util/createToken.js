const jwt = require('jsonwebtoken');

const createToken = (data, expiresIn) => {
	return new Promise((resolve, reject) => {
		jwt.sign(data, process.env.TOKEN_KEY, { expiresIn }, (err, token) => {
			if (err) reject(err);
			resolve(token);
		});
	});
};

const validateToken = token => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, process.env.TOKEN_KEY, (err, { result }) => {
			if (err) reject({ message: 'Unauthorized', status: 401 });
			else {
				if (result) resolve({ success: result.email });
				else reject({ message: 'Unauthorized', status: 401 });
			}
		});
	});
};

module.exports = { createToken, validateToken };
