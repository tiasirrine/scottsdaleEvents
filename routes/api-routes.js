require('isomorphic-fetch');
const fs = require('fs');
const { user } = require('../controllers');
const router = require('express').Router();
const nodemailer = require('nodemailer');
const db = require('../models');
const Json2csvParser = require('json2csv').Parser;
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Dropbox = require('dropbox').Dropbox;
const dbx = new Dropbox({ accessToken: process.env.DROPBOX });

// creates a new customer
router.post('/create/customer', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (!req.user.isAdmin) {
    res.sendStatus(401);
    return;
  }

  user
    .createCustomer(req.body)
    .then(result => {
      delete result.dataValues.password;
      res.json({ success: 'New customer created successfully' });
    })
    .catch(err => {
      console.log('error:', err);
      res.json({ error: 'An error occured' });
    });
});

// creates a new admin
// TODO: secure this route
router.post('/create/admin', (req, res) => {
  console.log(req.body);
  user
    .createAdmin(req.body)
    .then(result => {
      delete result.dataValues.password;
      res.json({ success: 'New admin created successfully' });
    })
    .catch(err => {
      console.log(err);
      res.send({ error: 'An error occured' });
    });
});

router.post('/create/cart', (req, res) => {
  user
    .createCart(req.body.id)
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

// creates a csv file for a customers estimate
router.post('/create/estimate', passport.authenticate('jwt', { session: false }), (req, res) => {
  const msg = 'An error occured while generating your estimate';
  // creates the columns for the csv file
  const fields = ['estimateId', 'id', 'qty'];
  let estimateId;

  // contains the rows for the csv file
  const { eventProps, cartProps } = req.body;
  Object.keys(eventProps).forEach(a => fields.push(a));

  db.Estimate.create({ _id: '1' })
    .then(result => {
      estimateId = result.dataValues.id;
      const merged = cartProps.map(product => {
        for (let info in eventProps) {
          product[info] = eventProps[info];
          product['estimateId'] = result.dataValues.id;
        }
        return product;
      });

      // creates the csv file. checks for errors.
      try {
        const parser = new Json2csvParser({ fields, quote: '' });
        const csv = parser.parse(merged);

        dbx
          .filesUpload({ contents: csv, path: `/estimate-${estimateId}` })
          .then(() => {
            user
              .createCart(req.user.id)
              .then(result => {
                console.log('File created.');
                res.json({ activeCart: result.dataValues.id });
              })
              .catch(err => {
                console.log(err);
                res.json({ err: msg });
              });
          })
          .catch(err => {
            console.log(err);
            res.json({ err: msg });
            return;
          });
      } catch (err) {
        console.log(err);
        res.json({ err: msg });
        return;
      }
    })
    .catch(error => {
      console.log(error);
      res.json({ err: msg });
      return;
    });
});

//route for nodemailer
router.post('/create/email', (req, res) => {
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

router.post('/update/admin', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log(req.body);
  user
    .updateAdmin(req.body)
    .then(() => {
      res.json({ success: 'Your profile has been updated' });
    })
    .catch(err => {
      res.json(err);
    });
});

router.post('/update/qty', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { ProductId, qty } = req.body;
  db.CartProduct.update({ qty: qty }, { where: { ProductId: ProductId } })
    .then(result => {
      console.log(result);
      res.send('success');
    })
    .catch(error => {
      console.log(error);
      res.send(error);
    });
});

// updates any customer freeze
router.post('/update/customer', passport.authenticate('jwt', { session: false }), (req, res) => {
  user
    .updateCustomer(req.body)
    .then(() => {
      res.json({ success: 'Success' });
    })
    .catch(err => {
      console.log(err);
      res.send({ error: 'An error occured' });
    });
});

// deletes a customer
router.post('/delete/customer', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id } = req.body;
  if (!req.user.isAdmin) {
    res.sendStatus(401);
    return;
  }

  user
    .deleteCustomer(id)
    .then(() => res.send({ success: 'Success' }))
    .catch(err => {
      console.log(err);
      res.send({ error: 'An error occured' });
    });
});

router.post('/delete/admin', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id } = req.body;
  if (!req.user.isAdmin) {
    res.sendStatus(401);
    return;
  }
  user
    .deleteAdmin(id)
    .then(() => res.send({ success: 'Success' }))
    .catch(err => {
      console.log(err);
      res.send({ error: 'An error occured' });
    });
});

router.post('/delete/product', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { cartProductId } = req.body;
  db.CartProduct.destroy({ where: { id: cartProductId } })
    // res is either 1 or 0. 1 is a success, 0 is a fail.
    .then(result => {
      if (result) res.status(200).send('Product removed');
      else res.status(500).send('Failed to remove product');
    })
    .catch(err => {
      console.log(err);
      throw res.status(500).send('Failed to remove product');
    });
});

// loads all customers
router.get('/get/customers', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (!req.user.isAdmin) {
    res.sendStatus(401);
    return;
  }
  user
    .getAllCustomers()
    .then(result => res.status(200).send({ success: result }))
    .catch(err => {
      console.log('error:', err);
      res.status.send({ error: err });
    });
});

// loads all customers
router.get('/get/admins', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (!req.user.isAdmin) {
    res.sendStatus(401);
    return;
  }
  user
    .getAllAdmins()
    .then(result => res.status(200).send({ success: result }))
    .catch(err => {
      console.log('error:', err);
      res.status.send({ error: err });
    });
});

// gets all the products. runs on first page load.
router.get('/get/products', (req, res) => {
  db.Product.findAll({})
    .then(result => res.status(200).send(result))
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    });
});

router.get('/get/carts', passport.authenticate('jwt', { session: false }), (req, res) => {
  user
    .loadCarts(req.user.id)
    .then(result => {
      console.log(result);
      // returns carts sorted by the isActive boolean value
      // ensures the active cart is at index 0
      const x = result.sort((x, y) => {
        return x.isActive === y.isActive ? 0 : x.isActive ? 1 : 1;
      });
      res.status(200).json(x);
    })
    .catch(err => res.status(500).send(err));
});

// saves a product to a customers cart
router.post('/save/product', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { ProductId, CartId } = req.body;
  console.log(req.body);
  // this will either create a new product to save to a cart,
  // or it will update an already saved product
  // prevents a cart from having duplicate line items for the same product
  db.CartProduct.findOne({ where: { ProductId: ProductId, CartId: CartId } }).then(result => {
    console.log(result);
    if (result) {
      const { qty, maxQty } = result.dataValues;
      if (Number(req.body.qty) + qty > maxQty) {
        res.send(`Max Quantity Exceeded. You already saved ${qty} items`);
        return false;
      }
      req.body.qty = Number(req.body.qty) + qty;
      result
        .update(req.body)
        .then(() => res.send('Product Saved'))
        .catch(err => {
          console.log(err);
          res.status(500).send('Failed to save product');
        });
    } else {
      db.CartProduct.create(req.body)
        .then(() => res.send('Product Saved'))
        .catch(err => {
          console.log('eeeee', err);
          res.status(500).send('Failed to save product');
        });
    }
  });
});

// authentictes a customer and sets a token
router.post('/auth/customer', (req, res) => {
  const { email, password } = req.body;
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
      res.status(401).send(err);
    });
});

// authentictes an admin and sets a token
router.post('/auth/admin', (req, res) => {
  const { email, password } = req.body;
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

router.get('/auth/token', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).json({ isAdmin: req.user.isAdmin });
});

module.exports = router;
