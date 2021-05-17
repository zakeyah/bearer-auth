'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const usersSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

usersSchema.pre('save', async function() {
  this.password = await bcrypt.hash(this.password, 10);
});

usersSchema.statics.validUser=async function(username, password){
  const user = await Users.findOne({ username: username });
  const valid = await bcrypt.compare(password, user.password);
  if (valid) { return user; }
  throw new Error('Invalid User');
  
};
usersSchema.statics.authenticateToken = async function(token) {
  let payload = jwt.verify(token, SECRET);
  console.log("payload >>> ", payload);
  return await this.findOne({username: payload.username});
}
const Users = mongoose.model('users', usersSchema);

module.exports= Users;
  
  