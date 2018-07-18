const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
// const flash = require('connect-flash');
const routes = require('./routes/api-routes');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

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

// Start the API server
app.listen(PORT, function() {
  console.log(
    `🌎  ==> API Server now listening on PORT ${PORT} in ${process.env}!`
  );
});
