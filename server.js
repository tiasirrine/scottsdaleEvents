require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes/api-routes');
const db = require('./models');
const passport = require('passport');
const cors = require('cors');
const compression = require('compression');
const debug = require('debug');
const debugError = debug('express:error');
const debugRoute = debug('express:route');
const app = express();
const PORT = process.env.PORT || 3001;
const logger = require('./util/logger');

app.use(cors());
app.use(compression());

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./util/passport')(passport);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

const logRoute = (req, res, next) => {
  logger.debug('REQ:', {
    route: req.originalUrl,
    method: req.method,
    query: req.query,
    body: req.body,
    headers: req.headers
  });
  next();
};

app.use(logRoute);

// Add routes, both API and view
app.use(routes);

// when deployed, if a page refreshes it tries to make a request to the server for that page
// since this is react our pages are routed dynamically
// re-directs all requests to serve the home page which will properly load the page
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/client/public/index.html'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// error handling middleware for all routes
app.use(function(error, req, res, next) {
  const status = error.status || 500;
  const message = error.message || 'An unknown error occured';

  // only write errors to console.log in dev mode
  if (process.env.NODE_ENV !== 'production') {
    debugError(error);
    debugRoute('Error occured at: ' + req.originalUrl);
  } else {
    if (req.body) {
      delete req.body.password;
    }
    const log = {
      REQ: req.originalUrl,
      status: status,
      method: req.method,
      query: req.query,
      body: req.body,
      error: error.stack
    };
    logger.error(log);
  }
  res.status(status).json({ message: message });
});

// Start the API server
db.sequelize.sync().then(() => {
  app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}`);
  });
});
