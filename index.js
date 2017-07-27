const express = require('express');
const routes = require('./routes/api')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//set up express app
const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost/ninjadb1');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
//use router module
app.use('/api', routes);

// listen for request
app.listen(process.env.port || 4000, function() {
    console.log(`now listening for request at:${process.env.port !== undefined ? process.env.port: 4000}`);
});