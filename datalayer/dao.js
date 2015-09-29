/**
 * Created by osnircunha on 9/28/15.
 */
var sqlite3 = require('sqlite3').verbose();
module.exports = new sqlite3.Database(__dirname + "/contact.sqlite");