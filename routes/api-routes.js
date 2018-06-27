require('dotenv').config();
const controllers = require('../controllers');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const upload = require('../util/multer');
const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const users = controllers.userController;
const products = controllers.productController;

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
  console.log(req.body);
  const newCharge = ({ body } = req.body);
  stripe.customers
    .create({ email: newCharge.email, source: newCharge.token })
    .then(customer => {
      stripe.charges.create({
        amount: newCharge.total.replace(/\D/g, ''),
        description: 'Test charge',
        currency: 'usd',
        customer: customer.id
      });
    })
    .then(() => console.log('PAYMENT SUCCESS'))
    .catch(err => console.log(err));
});

module.exports = router;
