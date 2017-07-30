const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');
const Person = require('../models/person');


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
            res.send(err);
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
        res.send(err);
    });

});

// get list of persons from db
router.get('/person', function(req, res) {
    Person.find({}).then((persons) => {
        res.send(persons)
    }).catch((err) => {
        throw new Error(err);
        res.send(err);
    })
});

// get persons by name from db
router.get('/person/:pn/:ps', function(req, res) {
    res.setHeader("Content-Type", "applicaiton/json");

    find(Person, parseInt(req.params.pn), parseInt(req.params.ps))
        .then((persons) => {
            res.send(persons);
        })
        .catch((err) => {
            res.json({
                error: err
            })
        });

});

// get persons count
router.get('/personCount', function(req, res) {
    res.setHeader("Content-Type", "applicaiton/json");
    getCount(Person)
        .then((count) => {
            res.json({ count: count });
        })
        .catch((err) => {
            res.json({
                error: err
            })
        });

});

function getCount(model) {
    return new Promise((resolve, reject) => {

        if (model !== undefined) {
            model.count({}, (err, count) => {
                if (err)
                    reject(err)

                resolve(count)
            })

        } else {
            let err = new Error("model cannot be undefined:");
            reject(err);
        }
    })
}

function find(model, pn = 1, ps = 10) {
    return new Promise((resolve, reject) => {
        let startFrom = ((pn - 1) * ps);

        if (model !== undefined) {
            try {
                model.find(null, null, {
                    skip: startFrom,
                    limit: ps
                }, function(err, data) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }

                });
            } catch (e) {

                reject(e);
            }

        } else {
            let err = new Error("model can not be undefined:");
            reject(err);
        }
    });

}


// add new person to db
router.post('/person', function(req, res) {
    // create new instance and save it to database by mongoose
    Person.create(req.body).then((person) => {
        res.send({
            type: 'POST',
            data: req.body
        });
    }).catch((err) => {
        //throw new Error(err);
        res.send(err);
    });

});

//Exports the router module
module.exports = router;