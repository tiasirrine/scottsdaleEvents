require('dotenv').config();
const { products, users } = require('../controllers');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router = require('express').Router();
const nodemailer = require('nodemailer');
// loads the categories for the InventoryNav
router.get('/get-distinct-category', (req, res) => {
  products
    .selectAllCategories()
    .then(result => {
      res.send(result);
    })
    .catch(err => res.status(500).send(err));
});

router.get('/get-category-products', (req, res) => {
  const { category } = req.query;
  products
    .selectAll()
    .then(result => res.send(result))
    .catch(err => console.log(err));
});

// creates a new customer
router.post('/create-customer', (req, res) => {
  users
    .createCustomer(req.body)
    .then(result => {
      delete result.dataValues.password;
      res.json(result);
    })
    .catch(err => res.send(err));
});

// gets a new customer
//FIXME: This should get a user by id
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

// router.post('save-product', (req, res) => {
//   //
// });

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
      .catch(err => done(null, false));
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
