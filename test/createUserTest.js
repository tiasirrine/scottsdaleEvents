// const expect = require('chai').expect;
const assert = require('assert');
const User = require('../models/User');
const userController = require('../controllers/userController');

describe('Creating users', () => {
  it('Should create a new user', done => {
    const trev = { username: 'Trevor', password: 'Johnson' };
    User.create(trev).then(() => {
      assert(!trev.isNew === true);
      done();
    });
  });

  describe('Hashing password', () => {
    it('Should hash a users password', done => {
      const josh = { username: 'Joshss', password: 'Hinton' };
      console.log(userController.hashPassword(josh));
      done();
    });
  });

  // it('Should create a new user', done => {
  //   const trev = { username: 'Trevor', password: 'Johnson' };
  //   User.create(trev).then(() => {
  //     expect(!trev.isNew).to.be.true;
  //     done();
  //   });
  // });

  // it('Should fail with no username', done => {
  //   const noName = { username: '', password: 'Johnson' };
  //   User.create(noName).catch(result => {
  //     const msg = result.errors.username.message;
  //     expect(msg).to.equal('Username is required');
  //     done();
  //   });
  // });

  // it('Should fail with no password', done => {
  //   const noPass = { username: 'Trevor', password: '' };
  //   User.create(noPass).catch(result => {
  //     const msg = result.errors.password.message;
  //     expect(msg).to.equal('Password is required');
  //     done();
  //   });
  // });

  // it('Should fail with no username and no password', done => {
  //   const empty = { username: '', password: '' };
  //   User.create(empty).catch(result => {
  //     const noUser = result.errors.username.message;
  //     const noPass = result.errors.password.message;
  //     expect(noUser).to.equal('Username is required');
  //     expect(noPass).to.equal('Password is required');
  //     done();
  //   });
  // });

  // it('Should fail with too few characters for username', done => {
  //   const tia = { username: 'Tia', password: 'Sirrine' };
  //   User.create(tia).catch(result => {
  //     const msg = result.errors.username.message;
  //     expect(msg).to.equal('Username must be longer than 4 characters');
  //     done();
  //   });
  // });

  // it('Should fail with too few characters for password', done => {
  //   const tia = { username: 'Sirrine', password: 'Tia' };
  //   User.create(tia).catch(result => {
  //     const msg = result.errors.password.message;
  //     expect(msg).to.equal('Password must be longer than 4 characters');
  //     done();
  //   });
  // });
});
