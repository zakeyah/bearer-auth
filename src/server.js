'use strict';

const express = require('express');
const morgan = require('morgan');


const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./middleware/500');
const notFound =  require('./middleware/404');
const router = require('./auth/router')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(morgan('dev'));

app.use(router);

function start (port){
    app.listen(port,()=>console.log(`listen to port  ${port}`));
}

app.use('*',notFound);
app.use(errorHandler);

module.exports={
    app,
    start
}
