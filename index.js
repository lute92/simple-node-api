const mongoose = require('mongoose');
const express = require('express');
const routes = require('./routes/api')
const bodyParser = require('body-parser');


//set up express app
const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/ninjadb1');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
//use router module
app.use('/api', routes);

// listen for request
app.listen(process.env.port || 4000, function() {
    console.log(`now listening for request at:${process.env.port !== undefined ? process.env.port: 4000}`);
});