var express = require('express');
var router = express.Router();
var HttpStatus = require('http-status-codes');

var userDao = require('../datalayer/userDao');

/* GET users listing. */
router.post('/login', function (req, res) {
    var user = req.body;
    userDao.getByName(user.username, function (err, result) {
        if(result && user.credential == result.password){
            res.status(HttpStatus.OK).send('login ok');
        } else if (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
        } else {
            res.status(HttpStatus.UNAUTHORIZED).send('invalid credentials');
        }
    })
});

module.exports = router;
