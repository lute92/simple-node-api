const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

// get list of data from db
router.get('/ninjas', function(req, res) {
    res.send({ type: 'GET' });
});

// add new data to db
router.post('/ninjas', function(req, res) {
    // create new instance and save it to database by mongoose
    Ninja.create(req.body).then((ninja) => {
        res.send({
            type: 'POST',
            data: req.body
        });
    }).catch((err) => {
        throw new Error(err);
        res.send(err);
    });

});

// update a data of db
router.put('/ninjas/:id', function(req, res) {
    Ninja.find({ name: req.params.id }).then((result) => {
            console.log("Before Update:" + result)
            return Ninja.update({ name: req.params.id }, req.body);
        }).then((result) => {
            return Ninja.find({ name: req.params.id });
        })
        .then((afterUpdate) => {
            console.log("After Update:" + afterUpdate)
            res.send(afterUpdate);
        }).catch((err) => {
            throw new Error(err);
        })

});

// delete a data of db
router.delete('/ninjas/:id', function(req, res) {

    Ninja.find({ name: req.params.id }).then((result) => {
        return Ninja.remove();
    }).then((result) => {
        res.send(result);
    }).catch((err) => {
        throw new Error(err);
    });

});

//Exports the router module
module.exports = router;