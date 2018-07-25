require('dotenv').config();
// const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
// const flash = require('connect-flash');
const routes = require('./routes/api-routes');
const session = require('express-session');
const passport = require('passport');
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

// serve static files from /public
// app.use(express.static('./client/public'));

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// saves the users session
app.use(cookieParser());
app.use(
  session({
    secret: 'secret',
    saveUninitialized: false,
    resave: false
  })
);

// passport
app.use(passport.initialize());
app.use(passport.session());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Add routes, both API and view
app.use(routes);

// when deployed, if a page refreshes it tries to make a request to the server for that page
// since this is react our pages are routed dynamically
// re-directs all requests to serve the home page which will properly load the page
// app.get('/*', function(req, res) {
//   res.sendFile(path.join(__dirname, '/client/public'), function(err) {
//     if (err) {
//       res.status(500).send(err);
//     }
//   });
// });

// Start the API server
db.sequelize.sync().then(() => {
  app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}`);
  });
});
