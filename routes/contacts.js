/**
 * Created by osnircunha on 9/28/15.
 */
var express = require('express');
var router = express.Router();
var HttpStatus = require('http-status');

var contactDao = require('../datalayer/contactDao');

/* GET home page. */
router.get('/contacts', function (req, res, next) {
    if (req.params.id) {
        next();
    }
    contactDao.list(function (err, result) {
        if (result) {
            res.status(HttpStatus.OK).send(result);
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        }
    });
});

router.get('/contacts/:id', function (req, res) {
    var id = req.params.id;
    contactDao.getById(id, function (err, result) {
        if (result) {
            res.status(HttpStatus.OK).send(result);
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        }
    });
});

router.put('/contacts', function (req, res) {
    var contact = req.body;
    contactDao.update(contact, function (err, result) {
        if (!err) {
            res.status(HttpStatus.OK).send(result);
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        }
    });
});

router.post('/contacts', function (req, res) {
    var contact = req.body;
    contactDao.save(contact, function (err, result) {
        if (!err) {
            res.status(HttpStatus.OK).send(result);
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        }
    });
});

router.delete('/contacts/:id', function (req, res) {
    var id = req.params.id;
    contactDao.delete(id, function (err, result) {
        if (!err) {
            res.status(HttpStatus.OK).send(result);
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        }
    });
});

module.exports = router;
