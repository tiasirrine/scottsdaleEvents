require('dotenv').config();
// const controllers = require('../controllers');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const upload = require('../util/multer');
const router = require('express').Router();
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const helpers = require('../util');

// post route to create a user
router.post('/createUser', (req, res) => {
  users
    .createNewUser(req.body)
    .then(res => console.log('CREATE USER RESULT:', res))
    .catch(err => console.log('CREATE USER ERROR:', err));
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log('REQ.USER:', req.user);
  res.send(true);
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
