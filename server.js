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
const dError = debug('express:error');
const app = express();
const PORT = process.env.PORT || 3001;

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

// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500).json({ error: err, message: err.message });
//   });
// }

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
  dError(error);
  res
    .status(error.status || 500)
    .json({ message: error.message || 'An error occured, please contact us.' });
});

// Start the API server
db.sequelize.sync().then(() => {
  app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}`);
  });
});
