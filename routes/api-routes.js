require('dotenv').config();
const controllers = require('../controllers');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const upload = require('../util/multer');
const router = require('express').Router();
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const helpers = require('../util');

const users = controllers.userController;
const products = controllers.productController;

// delete route to delete a user

// get route to login/authenticate a user
// implement passport for authenticating a user

// post route to create a product
// creating a product will require uploading an image
// if image upload is successful,
// then create the product
// else, throw err

// get route to retrieve all products
// get route to retrieve one product
// delete route to delete one product

// post route to create report about a new event
// post route for sending new event report to owner

// post route to create a user
router.post('/createUser', (req, res) => {
  users
    .createNewUser(req.body)
    .then(res => console.log('CREATE USER RESULT:', res))
    .catch(err => console.log('CREATE USER ERROR:', err));
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log('req.user:', req.user);
  res.send(req.user);
});

// receives the stripe token, and other form input
router.post('/charge', (req, res) => {
  helpers
    .charge(req.body)
    .then(result => res.send(result))
    .catch(error => console.log('CHARGE-ERROR:', error));
});

passport.use(
  new LocalStrategy(function(username, password, done) {
    users
      .findOne({ username, password })
      .then(user => done(null, user))
      .catch(err => done(null, false));
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  users.getUserById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = router;
