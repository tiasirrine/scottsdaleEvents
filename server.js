const bodyParser = require('body-parser');
const cors = require('cors');
// const cookieParser = require('cookie-parser');
const express = require('express');
// const expressValidator = require('express-validator');
// const flash = require('connect-flash');
const mongoose = require('mongoose');
// const passport = require('passport');
const routes = require('./routes/api-routes');
// const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/project3');

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
