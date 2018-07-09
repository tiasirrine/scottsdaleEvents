const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: [true, 'Username is required'],
    validate: {
      validator: username => username.length > 2,
      message: 'Username must be longer than 2 characters'
    },
    unique: [true, 'Username taken']
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Password is required'],
    validate: {
      validator: password => password.length > 4,
      message: 'Password must be longer than 4 characters'
    }
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
