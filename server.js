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

app.use(cors());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./util/passport')(passport);

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(routes);

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

db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`🌎  ==> API Server now listening on PORT ${PORT}`));
});
