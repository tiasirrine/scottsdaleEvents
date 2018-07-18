require('dotenv').config();
const fs = require('fs');
const { products, users, cart_products } = require('../controllers');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router = require('express').Router();
const Json2csvParser = require('json2csv').Parser;

router.get('/get-category-products', (req, res) => {
  products
    .selectAll()
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

// creates a new customer
router.post('/create-customer', (req, res) => {
  users
    .createCustomer(req.body)
    .then(result => {
      delete result.dataValues.password;
      res.json(result);
    }) //TODO: send 403 err with msg
    .catch(err => res.send(err.errors[0].message));
});

// gets a new customer
router.get('/get-customer', (req, res) => {
  const { username, password } = req.query;
  users
    .getCustomer(username, password)
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

// deletes a customer
router.post('/delete-customer', (req, res) => {
  const { id } = req.body;
  users
    .deleteCustomer(id)
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

// updates any customer freeze
router.post('/update-freeze', (req, res) => {
  const { bool, id } = req.body;
  const convertedBool = bool === 'true' ? true : false;
  users
    .updateFreeze(convertedBool, id)
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

// // loads all customers
router.get('/all-customers', (req, res) => {
  users
    .getAllCustomers()
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

router.post('/save-product', (req, res) => {
  cart_products
    .saveProductToCart(req.body)
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

router.post('/get-estimate', (req, res) => {
  console.log(req.body);
  const fields = Object.keys(req.body);
  const opts = { fields };
  const data = JSON.stringify(req.body);
});

router.get('/login', passport.authenticate('local'), (req, res) => {
  res.send(req.session.passport.user);
});

//FIXME: This needs to be usable for users and admins
passport.use(
  new LocalStrategy((username, password, done) => {
    users
      .getCustomer(username, password)
      .then(result => done(null, result))
      .catch(() => done(null, false));
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
