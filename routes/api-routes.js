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
  delete req.user.password;
  console.log('REQ.USER:', req.user);
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
  new LocalStrategy((username, password, done) => {
    const user = { username, password };
    users
      .findOne(user)
      .then(foundUser => {
        return done(null, foundUser);
      })
      .catch(error => {
        console.log('NO USER FOUND:', error);
        return done(null, false);
      });
  })
);

// saves the users session in a cookie based on the userID
passport.serializeUser((user, done) => {
  done(null, user);
});

// checks the cookie
passport.deserializeUser((id, done) => {
  users.getUserById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = router;
