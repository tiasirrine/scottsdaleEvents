require('dotenv').config();
const controllers = require('../models');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const upload = require('../util/multer');
const router = require('express').Router();
// const helpers = require('../util');
const inventory = controllers.inventory;
const users = controllers.users;

router.get('/get-distinct-category', (req, res) => {
  inventory.selectDistinctCategory('inventory', (err, result) => {
    if (err) res.status(500).send(err);
    res.send(result);
  });
});

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

// router.post('/login', passport.authenticate('local'), (req, res) => {
//   console.log('REQ.USER:', req.user);
//   res.send(true);
// });

router.post('/create-customer', (req, res) => {
  users.createCustomer(req.body, (err, result) => {
    if (err) res.status(500).send(err);
    res.status(200).send(result);
  });
});

router.post('/get-customer', (req, res) => {
  const { username } = req.body;
  users.selectCustomerByUsername('username', username, (err, result) => {
    if (err) res.status(500).send(err);
    res.status(200).send(result);
  });
});

router.post('/delete-customer', (req, res) => {
  users.deleteCustomer(req.body, (err, result) => {
    if (err) res.status(500).send(err);
    res.status(200).send(result);
  });
});

router.post('/freeze-customer', (req, res) => {
  const { frozen, id } = req.body;
  users.updateFreeze({ frozen }, { id }, (err, result) => {
    if (err) res.status(500).send(err);
    res.status(200).send(result);
  });
});

router.post('/unfreeze-customer', (req, res) => {
  const { frozen, id } = req.body;
  users.updateFreeze({ frozen }, { id }, (err, result) => {
    if (err) res.status(500).send(err);
    res.status(200).send(result);
  });
});

router.get('/all-customers', (req, res) => {
  users.selectAllCustomers((err, result) => {
    if (err) res.status(500).send(err);
    res.status(200).send(result);
  });
});

// passport.use(
//   new LocalStrategy((username, password, done) => {
//     const user = { username, password };
//     users
//       .findOne(user)
//       .then(foundUser => {
//         return done(null, foundUser);
//       })
//       .catch(error => {
//         console.log('NO USER FOUND:', error);
//         return done(null, false);
//       });
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
