require('isomorphic-fetch');
const { user } = require('../controllers');
const router = require('express').Router();
const mailer = require('../util/mailer');
const db = require('../models');
const Json2csvParser = require('json2csv').Parser;
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Dropbox = require('dropbox').Dropbox;
const dbx = new Dropbox({ accessToken: process.env.DROPBOX });
const date = require('../util/getDate');

const unAuthedErr = {
  message: 'Unauthorized',
  status: 401
};

// creates a new customer
router.post(
  '/create/customer',
  // passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    // if (!req.user.isAdmin) {
    //   next(unAuthedErr);
    //   return;
    // }
    user
      .createCustomer(req.body)
      .then(result => {
        delete result.dataValues.password;
        jwt.sign(
          { result, resetToken: true },
          'secretkey',
          { expiresIn: '1h' },
          (err, token) => {
            if (err) next(err);
            mailer(
              // set to req.body.email
              'johnsontrevor55@gmail.com',
              'Scottsdale Event Decor Login',
              'welcomeEmail',
              { token, result: req.body },
              (error, success) => {
                if (error) next(error);
                if (success) {
                  res.send({
                    success: 'New customer created successfully'
                  });
                }
              }
            );
          }
        );
      })
      .catch(next);
  }
);

// creates a new admin
// TODO: secure this route
router.post('/create/admin', (req, res, next) => {
  // if (!req.user.isAdmin) {
  //   next(unAuthedErr);
  //   return;
  // }
  user
    .createAdmin(req.body)
    .then(result => {
      delete result.dataValues.password;
      res.json({ success: 'New admin created successfully' });
    })
    .catch(next);
});

router.post(
  '/create/cart',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const { id: CustomerId } = req.body;
    db.Cart.create({ CustomerId, isActive: false })
      .then(result => {
        res.send({ success: result });
      })
      .catch(next);
  }
);

// creates a csv file for a customers estimate
router.post(
  '/create/estimate',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    let estimateId;
    const fields = ['estimateId', 'id', 'qty'];
    const { eventProps, cartProps } = req.body;
    const { CartId } = cartProps[0];
    const { id: CustomerId } = req.user;

    // adds each event info field into a field for the csv file
    Object.keys(eventProps).forEach(a => fields.push(a));

    db.Estimate.create({ CartId, CustomerId, ...eventProps })
      .then(result => {
        estimateId = result.dataValues.id;
        const merged = cartProps.map(product => {
          for (let info in eventProps) {
            product[info] = eventProps[info];
            product['estimateId'] = result.dataValues.id;
          }
          return product;
        });
        try {
          const parser = new Json2csvParser({ fields, quote: '' });
          const csv = parser.parse(merged);
          dbx
            .filesUpload({
              contents: csv,
              path: `/${date()}-${eventProps.groupName}-${estimateId}.csv`
            })
            .then(() => {
              user
                .createCart(CustomerId)
                .then(result => {
                  res.json({ activeCart: result.dataValues.id, estimateId });
                })
                .catch(next);
            })
            .catch(next);
        } catch (err) {
          next(err);
        }
      })
      .catch(next);
  }
);

router.post(
  '/update/admin',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    if (!req.user.isAdmin) {
      next(unAuthedErr);
      return;
    }
    user
      .updateAdmin(req.body)
      .then(() => {
        res.json({ success: 'Your profile has been updated' });
      })
      .catch(next);
  }
);

router.post(
  '/update/qty',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const { ProductId, qty, CartId } = req.body;
    db.CartProduct.update(
      { qty: qty },
      { where: { ProductId: ProductId, CartId: CartId } }
    )
      .then(result => {
        res.json({ success: 'success' });
      })
      .catch(next);
  }
);

// updates any customer
router.post(
  '/update/customer',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    user
      .updateCustomer(req.body)
      .then(() => {
        res.json({ success: 'Success' });
      })
      .catch(next);
  }
);

router.post(
  '/update/cart',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const { name, id } = req.body;
    db.Cart.update({ cartName: name, date: date() }, { where: { id: id } })
      .then(result => {
        res.json({ success: result });
      })
      .catch(next);
  }
);

// sets new active cart. sets old active cart to inactive
router.post(
  '/update/active-cart',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const { oldCartId, newCartId } = req.body;

    db.Cart.update({ isActive: true, date: date() }, { where: { id: newCartId } })
      .then(() => {
        db.Cart.update({ isActive: false }, { where: { id: oldCartId } })
          .then(result => {
            res.json({ success: result });
          })
          .catch(next);
      })
      .catch(next);
  }
);

// deletes a customer
router.post(
  '/delete/customer',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const { id } = req.body;
    if (!req.user.isAdmin) {
      next(unAuthedErr);
      return;
    }
    user
      .deleteCustomer(id)
      .then(() => res.send({ success: 'Success' }))
      .catch(next);
  }
);

router.post(
  '/delete/admin',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const { id } = req.body;
    if (!req.user.isAdmin) {
      next(unAuthedErr);
      return;
    }
    user
      .deleteAdmin(id)
      .then(() => res.send({ success: 'Success' }))
      .catch(next);
  }
);

router.post(
  '/delete/product',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const { cartProductId } = req.body;
    db.CartProduct.destroy({ where: { id: cartProductId } })
      // res is either 1 or 0. 1 is a success, 0 is a fail.
      .then(result => {
        if (result) res.status(200).send('Product removed');
        else next({ message: 'Failed to remove product' });
      })
      .catch(next);
  }
);

router.post(
  '/delete/cart',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    db.Cart.destroy({ where: { id: req.body.cartId } })
      .then(result => {
        if (result) res.send({ succes: 'Product removed' });
        else next({ message: result });
      })
      .catch(next);
  }
);

router.post(
  '/get/estimates',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const { CustomerId } = req.body;
    db.Estimate.findAll({
      where: {
        CustomerId: CustomerId
      },
      include: [{ model: db.Cart }]
    })
      .then(result => {
        res.send({ success: result });
      })
      .catch(next);
  }
);

// loads all customers
router.get(
  '/get/customers',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    if (!req.user.isAdmin) {
      next(unAuthedErr);
      return;
    }
    user
      .getAllCustomers()
      .then(result => res.status(200).send({ success: result }))
      .catch(next);
  }
);

// loads all customers
router.get(
  '/get/admins',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    if (!req.user.isAdmin) {
      next(unAuthedErr);
      return;
    }
    user
      .getAllAdmins()
      .then(result => res.status(200).send({ success: result }))
      .catch(next);
  }
);

// gets all the products. runs on first page load.
router.get('/get/products', (req, res, next) => {
  db.Product.findAll({})
    .then(result => {
      if (!result.length) {
        next({ message: 'Failed to load inventory. Please contact us.' });
      } else {
        res.status(200).send(result);
      }
    })
    .catch(next);
});

router.get(
  '/get/carts',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    user
      .getCarts(req.user.id)
      .then(result => {
        // returns carts sorted by the isActive boolean value
        // ensures the active cart is at index 0
        const x = result.sort((x, y) => {
          return x.isActive === y.isActive ? 0 : x.isActive ? -1 : 1;
        });
        res.status(200).json(x);
      })
      .catch(next);
  }
);

router.post(
  '/get/cart',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const { cartId } = req.body;
    db.Cart.findOne({
      where: { id: cartId },
      include: [
        {
          model: db.CartProduct,
          include: [{ model: db.Product }]
        }
      ]
    })
      .then(result => {
        res.send({ success: result });
      })
      .catch(next);
  }
);

// saves a product to a customers cart
router.post(
  '/save/product',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const { ProductId, CartId } = req.body;
    req.body.date = date();

    // this will either create a new product to save to a cart,
    // or it will update an already saved product
    // prevents a cart from having duplicate line items for the same product
    db.CartProduct.findOne({ where: { ProductId: ProductId, CartId: CartId } })
      .then(result => {
        const bodyQty = Number(req.body.qty);
        if (result) {
          const { qty, maxQty } = result.dataValues;
          if (bodyQty + qty > maxQty) {
            next({
              message: `Max Quantity Exceeded. You already saved ${qty} items`
            });
            return false;
          }
          req.body.qty = bodyQty + qty;
          result
            .update(req.body)
            .then(() => {
              user
                .getCarts(req.body.userId)
                .then(cart => {
                  let cartTotal = 0;
                  cart[0].CartProducts.forEach(item => {
                    cartTotal += item.Product.price * item.qty;
                  });
                  res.json(cartTotal);
                })
                .catch(next);
            })
            .catch(next);
        } else {
          db.CartProduct.create(req.body)
            .then(() => {
              user
                .getCarts(req.body.userId)
                .then(cart => {
                  let cartTotal = 0;
                  cart[0].CartProducts.forEach(item => {
                    cartTotal += item.Product.price * item.qty;
                  });
                  res.json(cartTotal);
                })
                .catch(next);
            })
            .catch(next);
        }
      })
      .catch(next);
  }
);

// authentictes a customer and sets a token
router.post('/auth/customer', (req, res, next) => {
  const { email, password } = req.body;
  user
    .getCustomer(email, password)
    .then(result => {
      jwt.sign({ result }, 'secretkey', { expiresIn: '1w' }, (err, token) => {
        if (err) next(err);
        const userId = result.id;
        user
          .getCarts(userId)
          .then(() => {
            user
              .getCarts(result.id)
              .then(cart => {
                result.cartTotal = 0;
                cart[0].CartProducts.forEach(item => {
                  result.cartTotal += item.Product.price * item.qty;
                });
                res.send({ token, user: result });
              })
              .catch(next);
          })
          .catch(next);
      });
    })
    .catch(next);
});

// authentictes an admin and sets a token
router.post('/auth/admin', (req, res, next) => {
  const { email, password } = req.body;
  user
    .getAdmin(email, password)
    .then(result => {
      jwt.sign({ result }, 'secretkey', { expiresIn: '1w' }, (err, token) => {
        if (err) next(err);
        res.send({ token, user: result });
      });
    })
    .catch(next);
});

router.get(
  '/auth/token',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.status(200).json({ isAdmin: req.user.isAdmin });
  }
);

router.post('/auth/reset', (req, res, next) => {
  const { token } = req.body;
  jwt.verify(token, 'secretkey', (err, decoded) => {
    if (err) {
      next({ message: 'Unauthorized', status: 401 });
    } else {
      if (decoded.resetToken) {
        res.send({ success: decoded.result.email });
      } else {
        next({ message: 'Unauthorized', status: 401 });
      }
    }
  });
});

// contact form email
router.post('/send/info', (req, res, next) => {
  const m = req.body;
  mailer(
    m.email,
    'Information Request',
    'confirmationEmail',
    m,
    (error, success) => {
      if (error) {
        next(error);
      }
      if (success) {
        mailer(
          m.email,
          'Scottsdale Event Decor Confirmation Email',
          'contactEmailForSED',
          m,
          (error, success) => {
            if (error) {
              next(error);
            }
            if (success) {
              res.send({ success: true });
            }
          }
        );
      }
    }
  );
});

router.post('/send/reset', (req, res, next) => {
  const { email, route } = req.body;
  user
    .resetPasswordFindUser(email, route)
    .then(result => {
      jwt.sign(
        { result, resetToken: true },
        'secretkey',
        { expiresIn: '1h' },
        (err, token) => {
          if (err) next(err);
          mailer(
            'johnsontrevor55@gmail.com',
            'Reset Password',
            'resetEmail',
            { token, firstName: result.firstName },
            (error, success) => {
              if (error) {
                next(error);
              }
              if (success) {
                res.send({
                  success: 'We have sent an email to reset your password'
                });
              }
            }
          );
        }
      );
    })
    .catch(next);
});

router.post('/reset/password', (req, res, next) => {
  const { token, password } = req.body;
  jwt.verify(token, 'secretkey', (err, decoded) => {
    if (err) {
      next({ message: 'Unauthorized', status: 401 });
    } else {
      if (decoded.resetToken) {
        const { id, isAdmin } = decoded.result;
        user
          .resetPassword(id, isAdmin, password)
          .then(() => {
            res.send({ success: true, isAdmin });
          })
          .catch(next);
      } else {
        next({ message: 'Unauthorized', status: 401 });
      }
    }
  });
});

router.post('/copy/cart', (req, res, next) => {
  db.CartProduct.findAll({
    where: {
      CartId: req.body.cartId
    }
  })
    .then(result => {
      const json = JSON.parse(JSON.stringify(result));
      const copiedCart = json.map(item => {
        delete item.id;
        item.CartId = parseInt(req.body.activeCartId);
        return item;
      });
      db.CartProduct.bulkCreate(copiedCart)
        .then(() => {
          res.send({ success: 'Success' });
        })
        .catch(next);
    })
    .catch(next);
});

module.exports = router;
