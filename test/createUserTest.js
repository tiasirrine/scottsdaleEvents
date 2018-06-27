// const expect = require('chai').expect;
const assert = require('assert');
const User = require('../models/User');
const users = require('../controllers/userController');

describe('Creating users', () => {
  it('Should generate a salt, should generate a hash, and save a new user', done => {
    const trev = { username: 'Trevor', password: 'Johnson' };
    users.createNewUser(trev).then(res => {
      assert.equal(res, 'User created');
      done();
    });
  });

  it('Should fail with no username', done => {
    const noName = { username: '', password: 'Johnson' };
    User.create(noName).catch(result => {
      const msg = result.errors.username.message;
      assert.equal(msg, 'Username is required');
      done();
    });
  });

  it('Should fail with no password', done => {
    const noPass = { username: 'Trevor', password: '' };
    User.create(noPass).catch(result => {
      const msg = result.errors.password.message;
      assert.equal(msg, 'Password is required');
      done();
    });
  });

  it('Should fail with no username and no password', done => {
    const empty = { username: '', password: '' };
    User.create(empty).catch(result => {
      const noUser = result.errors.username.message;
      const noPass = result.errors.password.message;
      assert.equal(noUser, 'Username is required');
      assert.equal(noPass, 'Password is required');
      done();
    });
  });

  it('Should fail with too few characters for username', done => {
    const tia = { username: 'Tia', password: 'Sirrine' };
    User.create(tia).catch(result => {
      const msg = result.errors.username.message;
      assert.equal(msg, 'Username must be longer than 4 characters');
      done();
    });
  });

  it('Should fail with too few characters for password', done => {
    const tia = { username: 'Sirrine', password: 'Tia' };
    User.create(tia).catch(result => {
      const msg = result.errors.password.message;
      assert.equal(msg, 'Password must be longer than 4 characters');
      done();
    });
  });
});
