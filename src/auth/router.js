'use strict';

const express = require('express');
const Users= require('./models/users-model');
const basicAuth = require('./middleware/basic');
const bearerAuth = require('./middleware/bearer-auth');

const router = express.Router();


router.post('/signup', async (req, res) => {

    try {
      // req.body.password = await bcrypt.hash(req.body.password, 10);
      const user = new Users(req.body);
      const record = await user.save(req.body);
      res.status(201).json(record);
    } catch (e) { res.status(403).send("Error Creating User"); }
  });


  router.post('/signin',basicAuth, async (req, res) => {

       res.status(200).json(req.user);
  
  });
  router.post('/signin',basicAuth, async (req, res) => {

    res.status(200).json(req.user);

    // {user:req.user,token:req.token}
   

});
router.get('/secret',bearerAuth,(req,res)=>{
  res.send('welcom to my secret')
})



  module.exports= router;
