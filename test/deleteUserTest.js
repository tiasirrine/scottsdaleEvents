const expect = require('chai').expect;
const User = require('../models/User');

describe('Delete User', () => {
  let trevor;

  beforeEach(done => {
    trevor = { username: 'Trevor', password: 'Johnson' };
    User.create(trevor).then(() => done());
  });

  it('Should delete one user', done => {
    User.deleteOne({ username: 'Trevor' }).then(result => {
      expect(result.n).to.equal(1);
      done();
    });
  });
});
