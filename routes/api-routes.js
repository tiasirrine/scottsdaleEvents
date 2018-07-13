require('dotenv').config();
const { products, users } = require('../controllers');
// const {
//   Admins,
//   Cart_products,
//   Customers,
//   Products,
//   User_carts
// } = require('../models');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
const router = require('express').Router();

// loads the categories for the InventoryNav
router.get('/get-distinct-category', (req, res) => {
  products
    .selectAllCategories()
    .then(result => res.send(result))
    .catch(err => res.status(500).send(err));
});

// loads the individual category products
// TODO: this needs to be a get route
router.get('/get-category-products', (req, res) => {
  const { category } = req.query;
  products
    .selectAllProductsByCategory(category)
    .then(result => res.send(result))
    .catch(err => console.log(err));
});

// // creates a new customer
router.post('/create-customer', (req, res) => {
  //
});

// // gets a new customer
// router.post('/get-customer', (req, res) => {
//   //
// });

// // deletes a customer
// router.post('/delete-customer', (req, res) => {
//   //
// });

// // freezes a customer (locks a customers account)
// router.post('/freeze-customer', (req, res) => {
//   //
// });

// // unfreezes a customer (unlocks a customers account)
// router.post('/unfreeze-customer', (req, res) => {
//   //
// });

// // loads all customers
// router.get('/all-customers', (req, res) => {
//   //
// });

// router.post('save-product', (req, res) => {
//   //
// });

// router.post('/login', passport.authenticate('local'), (req, res) => {
//   console.log('REQ.USER:', req.session.passport.user);
//   res.send(true);
// });

// passport.use(
//   new LocalStrategy((username, password, done) => {
//     const user = { username, password };
//     users.selectOneCustomer(user, (err, result) => {
//       if (err) {
//         return done(null, false);
//       } else {
//         return done(null, result);
//       }
//     });
//   })
// );

// // saves the users session in a cookie based on the userID
// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// // checks the cookie
// passport.deserializeUser((id, done) => {
//   users.getUserById(id, (err, user) => {
//     done(err, user);
//   });
// });

module.exports = router;
