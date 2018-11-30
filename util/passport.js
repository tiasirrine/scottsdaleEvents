const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../controllers/userController');

module.exports = function(passport) {
	let opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken('bearer');
	opts.secretOrKey = process.env.TOKEN_KEY;

	// Strategy to authenticate customers
	passport.use(
		'auth-customer',
		new JwtStrategy(opts, async (jwt_payload, done) => {
			// console.log(jwt_payload);
			if (!jwt_payload.result.isAdmin) {
				try {
					const user = await User.getUserById(jwt_payload.result.id);
					const userObj = {
						id: user[0].id,
						email: user[0].email,
						activeCart: user[0].Carts[0].id,
						isAdmin: false,
						resetToken: jwt_payload.result.token
					};
					return done(null, userObj);
				} catch (e) {
					console.log('err', err);
					return done(null, false);
				}
			} else {
				return done(null, false);
			}
		})
	);

	// Strategy to authenticate admins
	passport.use(
		'auth-admin',
		new JwtStrategy(opts, async (jwt_payload, done) => {
			// console.log(jwt_payload);
			// checks if a user is an admin
			if (jwt_payload.result.isAdmin) {
				try {
					const admin = await User.getAdminById(jwt_payload.result.id);
					// declares values to req.user
					const userObj = {
						id: admin[0].id,
						email: admin[0].email,
						isAdmin: true,
						resetToken: jwt_payload.result.token
					};
					return done(null, userObj);
				} catch (e) {
					console.log('err', err);
					return done(null, false);
				}
			} else {
				return done(null, false);
			}
		})
	);

	// Strategy to check auth on both users and admins
	passport.use(
		'general-auth',
		new JwtStrategy(opts, async (jwt_payload, done) => {
			// console.log(jwt_payload);
			// checksif a user is an admin
			if (jwt_payload.result.isAdmin) {
				try {
					const admin = await User.getAdminById(jwt_payload.result.id);
					const userObj = {
						id: admin[0].id,
						email: admin[0].email,
						isAdmin: true,
						resetToken: jwt_payload.result.token
					};
					return done(null, userObj);
				} catch (e) {
					console.log('err', err);
					return done(null, false);
				}
			} else {
				try {
					const user = await User.getUserById(jwt_payload.result.id);
					const userObj = {
						id: user[0].id,
						email: user[0].email,
						activeCart: user[0].Carts[0].id,
						isAdmin: false,
						resetToken: jwt_payload.result.token
					};
					return done(null, userObj);
				} catch (e) {
					console.log('err', err);
					return done(null, false);
				}
			}
		})
	);
};
