require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes/api-routes');
const db = require('./models');
const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 3001;

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

// Add routes, both API and view
app.use(routes);

// when deployed, if a page refreshes it tries to make a request to the server for that page
// since this is react our pages are routed dynamically
// re-directs all requests to serve the home page which will properly load the page
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/client/public'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// Start the API server
db.sequelize.sync().then(() => {
  app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}`);
  });
});
