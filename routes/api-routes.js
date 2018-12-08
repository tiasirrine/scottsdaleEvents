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
const { createToken, validateToken } = require('../util/createToken');

// secures admin routes
const authAdmin = () => passport.authenticate('auth-admin', { session: false });

// secures customer routes
const authCustomer = () =>
	passport.authenticate('auth-customer', { session: false });

// secures admin and customer routes
const generalAuth = () =>
	passport.authenticate('general-auth', { session: false });

// creates a new customer
router.post('/create/customer', authAdmin(), async ({ body }, res, next) => {
	try {
		const result = await user.createCustomer(body);
		delete result.dataValues.password;
		const token = await createToken({ result, resetToken: true }, '1h');
		await mailer(body.email, 'Scottsdale Event Decor Login', 'welcomeEmail', {
			token,
			result: body
		});
		res.send({ success: 'New customer created successfully' });
	} catch (e) {
		next(e);
	}
});

// creates a new admin
// TODO: secure this route
router.post('/create/admin', authAdmin(), (req, res, next) => {
	user
		.createAdmin(req.body)
		.then(result => {
			delete result.dataValues.password;
			res.json({ success: 'New admin created successfully' });
		})
		.catch(next);
});

router.post('/create/cart', authCustomer(), (req, res, next) => {
	const { id: CustomerId } = req.body;
	db.Cart.create({ CustomerId, isActive: false })
		.then(result => {
			res.send({ success: result });
		})
		.catch(next);
});

// creates a csv file for a customers estimate
router.post('/create/estimate', authCustomer(), (req, res, next) => {
	let estimateId;
	const fields = ['estimateId', 'id', 'qty', 'price'];
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
});

router.post('/update/admin', authAdmin(), (req, res, next) => {
	user
		.updateAdmin(req.body)
		.then(() => {
			res.json({ success: 'Your profile has been updated' });
		})
		.catch(next);
});

router.post('/update/qty', authCustomer(), (req, res, next) => {
	const { ProductId, qty, CartId } = req.body;
	db.CartProduct.update(
		{ qty: qty },
		{ where: { ProductId: ProductId, CartId: CartId } }
	)
		.then(result => {
			res.json({ success: 'success' });
		})
		.catch(next);
});

// updates any customer
router.post('/update/customer', generalAuth(), (req, res, next) => {
	user
		.updateCustomer(req.body)
		.then(() => {
			res.json({ success: 'Success' });
		})
		.catch(next);
});

router.post('/update/cart', authCustomer(), (req, res, next) => {
	const { name, id } = req.body;
	db.Cart.update({ cartName: name, date: date() }, { where: { id: id } })
		.then(result => {
			res.json({ success: result });
		})
		.catch(next);
});

// sets new active cart. sets old active cart to inactive
router.post('/update/active-cart', authCustomer(), (req, res, next) => {
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
});

// deletes a customer
router.post('/delete/customer', authAdmin(), (req, res, next) => {
	const { id } = req.body;
	user
		.deleteCustomer(id)
		.then(() => res.send({ success: 'Success' }))
		.catch(next);
});

router.post('/delete/admin', authAdmin(), (req, res, next) => {
	const { id } = req.body;
	user
		.deleteAdmin(id)
		.then(() => res.send({ success: 'Success' }))
		.catch(next);
});

router.post('/delete/product', authCustomer(), (req, res, next) => {
	const { cartProductId } = req.body;
	db.CartProduct.destroy({ where: { id: cartProductId } })
		// res is either 1 or 0. 1 is a success, 0 is a fail.
		.then(result => {
			if (result) res.status(200).send('Product removed');
			else next({ message: 'Failed to remove product' });
		})
		.catch(next);
});

router.post('/delete/cart', authCustomer(), (req, res, next) => {
	db.Cart.destroy({ where: { id: req.body.cartId } })
		.then(result => {
			if (result) res.send({ succes: 'Product removed' });
			else next({ message: result });
		})
		.catch(next);
});

router.post('/get/estimates', authCustomer(), (req, res, next) => {
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
});

// loads all customers
router.get('/get/customers', authAdmin(), (req, res, next) => {
	user
		.getAllCustomers()
		.then(result => res.status(200).send({ success: result }))
		.catch(next);
});

// loads all customers
router.get('/get/admins', authAdmin(), (req, res, next) => {
	user
		.getAllAdmins()
		.then(result => res.status(200).send({ success: result }))
		.catch(next);
});

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

router.get('/get/carts', authCustomer(), (req, res, next) => {
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
});

router.post('/get/cart', authCustomer(), (req, res, next) => {
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
});

// saves a product to a customers cart
router.post('/save/product', authCustomer(), (req, res, next) => {
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
});

// authentictes a customer and sets a token
router.post('/auth/customer', async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const result = await user.getCustomer(email, password);
		const token = await createToken({ result }, '1w');
		const carts = await user.getCarts(result.id);
		result.cartTotal = 0;
		carts[0].CartProducts.forEach(({ Product, qty }) => {
			result.cartTotal += Product.price * qty;
		});
		res.send({ token, user: result });
	} catch (e) {
		next(e);
	}
});

// authentictes an admin and sets a token
router.post('/auth/admin', async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const result = await user.getAdmin(email, password);
		const token = await createToken({ result }, '1w');
		res.send({ token, user: result });
	} catch (e) {
		next(e);
	}
});

router.get('/auth/token', generalAuth(), (req, res) => {
	res.status(200).json({ isAdmin: req.user.isAdmin });
});

router.post('/auth/reset', async (req, res, next) => {
	const { token } = req.body;
	try {
		const decoded = await validateToken(token);
		res.send(decoded);
	} catch (e) {
		next(e);
	}
});

// contact form email
router.post('/send/info', async ({ body }, res, next) => {
	const { email } = body;
	try {
		await mailer(email, 'Information Request', 'confirmationEmail', body);
		await mailer(
			'bob.omeara@scottsdaleeventdecor.com',
			'Scottsdale Event Decor Confirmation Email',
			'contactEmailForSED',
			body
		);
		res.send({ success: true });
	} catch (e) {
		next(e);
	}
});

router.post('/send/reset', async (req, res, next) => {
	const { email, route } = req.body;
	try {
		const result = await user.resetPasswordFindUser(email, route);
		const token = await createToken({ result }, '1h');
		await mailer(email, 'Reset Password', 'resetEmail', {
			token,
			firstName: result.firstName
		});
		res.send({
			success: 'We have sent an email to reset your password'
		});
	} catch (e) {
		next(e);
	}
});

router.post('/reset/password', async (req, res, next) => {
	const { token, password } = req.body;
	try {
		const { id, isAdmin } = await validateToken(token);
		await user.resetPassword(id, isAdmin, password);
		res.send({ success: true, isAdmin });
	} catch (e) {
		next({ message: 'Unauthorized', status: 401 });
	}
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

			let didErrorOccur = false;

			for (let i = 0; i < copiedCart.length; i++) {
				db.CartProduct.findOrCreate({
					where: {
						CartId: copiedCart[i].CartId,
						ProductId: copiedCart[i].ProductId
					},
					defaults: copiedCart[i]
				}).catch(error => {
					didErrorOccur = true;
					next(error);
				});
				if (i === copiedCart.length - 1 && !didErrorOccur) {
					res.send({ success: 'Success' });
				}
			}
		})
		.catch(next);
});

module.exports = router;
