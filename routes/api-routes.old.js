require('dotenv').config();
const controllers = require('../models');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router = require('express').Router();
const inventory = controllers.inventory;
const users = controllers.users;

// loads the categories for the InventoryNav
router.get('/get-distinct-category', (req, res) => {
  inventory.selectDistinctCategory('inventory', (err, result) => {
    if (err) res.status(500).send(err);
    res.send(result);
  });
});

// loads the individual category products
router.get('/get-category-products', (req, res) => {
  const { category } = req.query;
  inventory.selectAllCategoryProducts(
    'inventory',
    'CATEGORY',
    category,
    (err, result) => {
      if (err) res.status(500).send(err);
      res.send(result);
    }
  );
});

// creates a new customer
router.post('/create-customer', (req, res) => {
  users.createCustomer(req.body, (err, result) => {
    if (err) res.status(500).send(err);
    res.status(200).send(result);
  });
});

// gets a new customer
router.post('/get-customer', (req, res) => {
  users.selectOneCustomer(req.body, (err, result) => {
    if (err) res.status(500).send(err);
    res.status(200).send(result);
  });
});

// deletes a customer
router.post('/delete-customer', (req, res) => {
  users.deleteCustomer(req.body, (err, result) => {
    if (err) res.status(500).send(err);
    res.status(200).send(result);
  });
});

// freezes a customer (locks a customers account)
router.post('/freeze-customer', (req, res) => {
  const { frozen, id } = req.body;
  users.updateFreeze({ frozen }, { id }, (err, result) => {
    if (err) res.status(500).send(err);
    res.status(200).send(result);
  });
});

// unfreezes a customer (unlocks a customers account)
router.post('/unfreeze-customer', (req, res) => {
  const { frozen, id } = req.body;
  users.updateFreeze({ frozen }, { id }, (err, result) => {
    if (err) res.status(500).send(err);
    res.status(200).send(result);
  });
});

// loads all customers
router.get('/all-customers', (req, res) => {
  users.selectAllCustomers((err, result) => {
    if (err) res.status(500).send(err);
    res.status(200).send(result);
  });
});

router.post('save-product', (req, res) => {
  cart_product.saveProduct((err, result) => {
    if (err) res.status(500).send(err);
    res.status(200).send(result);
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log('REQ.USER:', req.session.passport.user);
  res.send(true);
});

passport.use(
  new LocalStrategy((username, password, done) => {
    const user = { username, password };
    users.selectOneCustomer(user, (err, result) => {
      if (err) {
        return done(null, false);
      } else {
        return done(null, result);
      }
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
