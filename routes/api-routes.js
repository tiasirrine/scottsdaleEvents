const fs = require('fs');
const { user } = require('../controllers');
const router = require('express').Router();
const nodemailer = require('nodemailer');
const db = require('../models');
const Json2csvParser = require('json2csv').Parser;
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.get(
  '/check-token',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.user);
    res.status(200).json({ isAdmin: req.user.isAdmin });
  }
);

// gets all the products. runs on first page load.
router.get('/get-products', (req, res) => {
  db.Product.findAll({})
    .then(result => res.status(200).send(result))
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    });
});

// creates a new customer
router.post('/create/customer', (req, res) => {
  user
    .createCustomer(req.body)
    .then(result => {
      delete result.dataValues.password;
      res.json(result);
    })
    .catch(err => res.send(err.errors[0].message));
});

// creates a new admin
router.post('/create/admin', (req, res) => {
  user
    .createAdmin(req.body)
    .then(result => {
      delete result.dataValues.password;
      res.json(result);
    })
    .catch(err => res.send(err.errors[0].message));
});

// deletes a customer
router.post('/delete-customer', (req, res) => {
  const { id } = req.body;
  user
    .deleteCustomer(id)
    .then(result => res.status(201).send(result))
    .catch(err => res.status(500).send(err));
});

// updates any customer freeze
router.post('/update-freeze', (req, res) => {
  const { bool, id } = req.body;
  const convertedBool = bool === 'true' ? true : false;
  user
    .updateFreeze(convertedBool, id)
    .then(result => res.status(201).send(result))
    .catch(err => res.status(500).send(err));
});

// loads all customers
router.get('/all-customers', (req, res) => {
  user
    .getAllCustomers()
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send(err));
});

// saves a product to a customers cart
router.post('/save-product', (req, res) => {
  db.CartProduct.create(req.body)
    .then(() => res.status(200).send('Product Saved'))
    .catch(() => res.status(500).send('Failed to save product'));
});

router.get(
  '/load-carts',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    user
      .loadCarts(req.user.id)
      .then(result => {
        // returns carts sorted by the isActive boolean value
        // ensures the active cart is at index 0
        result.sort((x, y) => {
          return x.isActive === y.isActive ? 0 : x ? 1 : -1;
        });
        res.status(200).json(result);
      })
      .catch(err => res.status(500).send(err));
  }
);

router.get(
  '/create-cart',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.user.id);
    user
      .createCart(req.user.id)
      .then(result => res.json(result))
      .catch(err => res.json(err));
  }
);

router.post('/delete-product', (req, res) => {
  const { cartProductId } = req.body;
  console.log(req.body);
  db.CartProduct.destroy({ where: { id: cartProductId } })
    // res is either 1 or 0. 1 is a success, 0 is a fail.
    .then(result => {
      if (result) res.status(200).send('Product removed');
      else res.status(500).send('Failed to remove product');
    })
    .catch(() => {
      throw res.status(500).send('Failed to remove product');
    });
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

// authentictes a customer and sets a token
router.get('/auth/customer', (req, res) => {
  const { email, password } = req.query;
  console.log(req.query);
  user
    .getCustomer(email, password)
    .then(result => {
      jwt.sign({ result }, 'secretkey', { expiresIn: '1w' }, (err, token) => {
        if (err) res.send(err);
        res.send({ token, user: result });
      });
    })
    .catch(err => {
      console.log('err', err);
      res.status(403).send(err);
    });
});

// authentictes an admin and sets a token
router.get('/auth/admin', (req, res) => {
  const { email, password } = req.query;
  console.log(req.query);
  user
    .getAdmin(email, password)
    .then(result => {
      jwt.sign({ result }, 'secretkey', { expiresIn: '1w' }, (err, token) => {
        if (err) res.send(err);
        res.send({ token, user: result });
      });
    })
    .catch(err => {
      console.log('err', err);
      res.status(403).send(err);
    });
});

module.exports = router;
