'use strict';
const base64 = require('base-64');
const Users= require('../models/users-model');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports= async (req,res,next)=>{
    let encodedString = req.headers.authorization.split(' ').pop();  // ['Basic', 'sdkjdsljd=']
    console.log('req.headers.authorization====>',req.headers.authorization)
    let decodedString = base64.decode(encodedString); // "username:password"
    console.log('decodedString ====>',decodedString)
    let [username, password] = decodedString.split(':'); // username, password
    
    try {
       
      const user= await Users.validUser(username, password);
      let token = jwt.sign({username: user.username}, SECRET,{ expiresIn: 15 * 60 });
      console.log(token);
      req.token= token;
      req.user= user;

    next();
    } catch (error) { res.status(403).send("Invalid Login"); }
}