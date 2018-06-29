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

// user selects item to add to cart
// selected item gets added to state
// when user goes to /checkout, load product info

// receives the stripe token, and other form input
router.post('/charge', (req, res) => {
  const newCharge = ({ body } = req.body);
  // creates a new customer to send to stripe
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
    .then(() => res.send('PAYMENT SUCCESS'))
    .catch(err => {
      console.log('ERR: api-routes.js', err);
      res.send(err.message);
    });
});

router.post('/createInvoice', (req, res) => {
  const body = req.body;
  stripe.customers
    .create({
      account_balance: body.amount,
      email: body.email,
      description: body.description,
      metadata: {
        first_name: body.first_name,
        last_name: body.last_name,
        phone: body.phone,
        event_location: body.event_location,
        event_guests: body.event_guests
      }
    })
    .then(customer => {
      stripe.invoiceItems.create({
        amount: customer.account_balance,
        currency: customer.currency
      });
    });

  res.json(req.body);
  // .then(customer => {
  //   stripe.invoiceItems
  //     .create({
  //       amount: customer.account_balance,
  //       currency: 'usd',
  //       customer: customer.id,
  //       description: body.description
  //     })
  //     .then(() => {
  //       stripe.invoices
  //         .create({
  //           customer: customer.id,
  //           billing: 'send_invoice',
  //           days_until_due: 30
  //         })
  //         .then(invoice => console.log(invoice));
  //     });

  // });
});

module.exports = router;
