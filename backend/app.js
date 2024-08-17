const express = require('express');
const bodyParser = require('body-parser');
const userSaveRouter = require('./routes/user_route')
const CampusRouter = require('./routes/campus_route')

const app = express();

// Middleware
app.use(bodyParser.json());

app.use('/',userSaveRouter);
app.use('/campus/',CampusRouter);

module.exports = app;