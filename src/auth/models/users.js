'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
const SECRET=process.env.SECRET|| 'KKKK';

const users = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Adds a virtual field to the schema. We can see it, but it never persists
// So, on every user object ... this.token is now readable!
users.virtual('token').get(function () {
  let tokenObject = {
    username: this.username,
  };
  console.log('tokenObject------',tokenObject);
  console.log(SECRET,'SECRET')
  return jwt.sign(tokenObject,SECRET,{ expiresIn: 15 * 60 });
});

users.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
    console.log(' this.password------>', this.password)
  }
});

// BASIC AUTH
users.statics.authenticateBasic = async function (username, password) {
  const user = await this.findOne({ username });
  console.log('user from the model---->',user,password)
  const valid = await bcrypt.compare(password, user.password);
  console.log('valid from the model---->',valid)
  if (valid) { return user; }
  throw new Error('Invalid User');
};

// BEARER AUTH
users.statics.authenticateWithToken = async function (token) {
  try {
    const parsedToken = jwt.verify(token, process.env.SECRET);
    const user = this.findOne({ username: parsedToken.username });
    if (user) { return user; }
    throw new Error("User Not Found");
  } catch (e) {
    throw new Error(e.message);
  }
};


module.exports = mongoose.model('users', users);
  
  