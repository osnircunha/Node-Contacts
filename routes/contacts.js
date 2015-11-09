/**
 * Created by osnircunha on 9/28/15.
 */
var express = require('express');
var router = express.Router();
var HttpStatus = require('http-status');

var contactDao = require('../datalayer/contactDao');

function sendError(err, res){

    res.status(HttpStatus.NOT_FOUND).send({
        code: HttpStatus.NOT_FOUND,
        message: !err ? "Not found at " + new Date() : err
    });
}

/* GET home page. */
router.get('/contacts', function (req, res, next) {
    contactDao.list(function (err, result) {
        if (err || !result) {
            sendError(err, res);
        } else {
            res.status(HttpStatus.OK).send(result);
        }
    });
});

router.get('/contacts/:id', function (req, res, next) {
    var id = req.params.id;
    contactDao.getById(id, function (err, result) {
        if (err || !result) {
            sendError(err, res);
        } else {
            res.status(HttpStatus.OK).send(result);
        }
    });
});

router.put('/contacts/:id', function (req, res, next) {
    var contact = req.body;
    contactDao.update(contact, function (err, result) {
        if (err) {
            sendError(err, res);
        } else {
            res.status(HttpStatus.OK).send(result);
        }
    });
});

router.post('/contacts', function (req, res, next) {
    var contact = req.body;
    contactDao.save(contact, function (err, result) {
        if (err) {
            sendError(err, res);
        } else {
            res.status(HttpStatus.OK).send(result);
        }
    });
});

router.delete('/contacts/:id', function (req, res, next) {
    var id = req.params.id;
    contactDao.delete(id, function (err, result) {
        if (err) {
            sendError(err, res);
        } else {
            res.status(HttpStatus.OK).send(result);
        }
    });
});

module.exports = router;
