var express = require('express');
var bodyParser = require('body-parser');
var HttpStatus = require('http-status');

var users = require('./routes/users');
var contacts = require('./routes/contacts');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/rest/', users, contacts);
app.use('/', express.static('web'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = HttpStatus.NOT_FOUND;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: err.message,
        error: err
    });
});

module.exports = app;
