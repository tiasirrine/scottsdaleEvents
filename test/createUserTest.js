const expect = require('chai').expect;
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
    users.createNewUser(noName).catch(result => {
      const msg = result.username.message;
      assert.equal(result.username.message, 'Username is required');
      done();
    });
  });

  it('Should fail with no password', done => {
    const noPass = { username: 'Trevor', password: '' };
    users.createNewUser(noPass).catch(err => {
      assert.equal(err, 'Password is required');
      done();
    });
  });

  it('Should fail with too few characters for username', done => {
    const bad = { username: 'a', password: 'abcd' };
    users.createNewUser(bad).catch(result => {
      const msg = result.username.message;
      assert.equal(msg, 'Username must be longer than 2 characters');
      done();
    });
  });

  it('Should fail with too few characters for password', done => {
    const bad = { username: 'abcd', password: 'a' };
    users.createNewUser(bad).catch(result => {
      assert(result, 'Password must be longer than 4 characters');
      done();
    });
  });

  it('Should pass with a matching password', done => {
    const josh = { username: 'Joshua', password: 'Hinton' };
    //create a new user
    //make a search to db for user (josh)
    users.createNewUser(josh).then(() => {
      users.findOne(josh.username, 'Hinton');
    });
  });
});
