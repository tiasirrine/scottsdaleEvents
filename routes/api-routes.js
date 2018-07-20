const fs = require('fs');
const { products, users, cart_products } = require('../controllers');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router = require('express').Router();
const nodemailer = require('nodemailer');


const Json2csvParser = require('json2csv').Parser;

// gets all the products. runs on first page load.
// stores products to prevent multiple calls to server for data

router.get('/get-category-products', (req, res) => {
  products
    .selectAll()
    .then(result => res.send(result))
    .catch(err => {
      console.log('get-category-products:', err);
      res.send(err);
    });
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

// loads all customers
router.get('/all-customers', (req, res) => {
  users
    .getAllCustomers()
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

// saves a product to a customers cart
router.post('/save-product', (req, res) => {
  cart_products
    .saveProductToCart(req.body)
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

// creates a csv file for a customers estimate
router.post('/get-estimate', (req, res) => {
  // creates the columns for the csv file
  const fields = ['id', 'name', 'qty', 'price', 'total'];

  // contains the rows for the csv file
  const products = req.body.products;

  // creates the csv file. checks for errors.
  try {
    const parser = new Json2csvParser({ fields, quote: '' });
    const csv = parser.parse(products);
    fs.writeFile('./csv/estimates/estimate.csv', csv, function(err) {
      if (err) console.log(err);
      console.log('File created.');
    });
  } catch (err) {
    console.log(err);
  }
});

//route for nodemailer
router.post('/api/form', (req, res) => {
  console.log(req.body);
  nodemailer.createTestAccount((err, account) => {
    if (err) {
      console.error('Failed to create a testing account. ' + err.message);
      return process.exit(1);
    }

    console.log('Credentials obtained, sending message...');

    const htmlEmail = `
      <h3>Contact Details</h3>
      <ul>
        <li>Name: ${req.body.name}</li>
        <li>CompanyName: ${req.body.companyName}</li>
        <li>Contact Number: ${req.body.number}</li>
        <li>Contact Email: ${req.body.contactEmail}</li
        <li>Message to Scottsdale Event Decor: ${req.body.email}</li>
      </ul>
    `;

    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'h5i4kjohpp6onalz@ethereal.email',
        pass: 'ephpes6sVk62fgzwNR'
      }
    });

    let mailOptions = {
      from: 'tesxt@testaccount.com',
      to: 'h5i4kjohpp6onalz@ethereal.email',
      replyTo: 'test@testaccount.com',
      subject: ' New Message ',
      text: req.body.message,
      html: htmlEmail
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err);
      }
      console.log('message sent: %s', info.message);
      console.log('Message URL: %s', nodemailer.getTestMessageUrl(info));
    });
  });
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
