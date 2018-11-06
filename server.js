require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes/api-routes');
const db = require('./models');
const passport = require('passport');
const helmet = require('helmet');
const compression = require('compression');
const debug = require('debug');
const debugError = debug('express:error');
const debugRoute = debug('express:route');
const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./util/passport')(passport);

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
	app.use(
		express.static('client/build', {
			setHeaders: (res, path) => {
				res.set('X-Powered-By', 'nosniff');
			}
		})
	);
}

// connects all routes
app.use(routes);

// serves bundled react files in prod
app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, '/client/build/index.html'), function(err) {
		if (err) {
			res.status(500).send(err);
		}
	});
});

// error handling middleware for all routes
app.use(function(error, req, res, next) {
	const status = error.status || 500;
	const message = error.message || 'An unknown error occured';
	debugError(error);
	debugRoute('Error occured at: ' + req.originalUrl);
	res.status(status).json({ message: message });
});

// starts server
db.sequelize.sync().then(() => {
	app.listen(PORT, () =>
		console.log(`🌎  ==> API Server now listening on PORT ${PORT}`)
	);
});
