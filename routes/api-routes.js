const controllers = require('../controllers');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const upload = require('../util/multer');
const router = require('express').Router();

const users = controllers.userController;
const product = controllers.productController;

// post route to create a user
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

// post route to stripe api for transactions

// user selects item to add to cart
// selected item gets added to state
// when user goes to /checkout, load product info

router.route('/charge').post((req, res) => {
  const amount = req.body.amount;

  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    })
    .then(customer => {
      stripe.charges.create({
        amount,
        description: req.body.description,
        customer: customer.id
      });
    })
    .then(charge => res.send('success'))
    .catch(err => res.send(err));
});

module.exports = router;
