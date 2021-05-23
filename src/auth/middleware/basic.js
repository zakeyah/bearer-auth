'use strict';

const User = require('../models/users.js');
const base64 = require('base-64');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { next('Invalid Login'); }
  console.log('req.headers.authorization---->',req.headers.authorization)
  let basic = req.headers.authorization.split(' ').pop();
  console.log('basic from basic----->',basic);
  let [user, pass] = base64.decode(basic).split(':');
  console.log('[user, pass] basic----->',user);
  console.log('[ pass] basic----->',pass);

  try {
    req.user = await User.authenticateBasic(user, pass);
    console.log(req.user,'kkkkkkkkk');
    console.log('token--------',req.user.token);
    // if(req.user.token)
    // req.token = req.user.token
    
    console.log('req.user.token',req.user.token);
    next();
  } catch (e) {
    console.log('is the e------>',e);
    res.status(403).send('Invalid Login');
  }

}