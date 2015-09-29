/**
 * Created by osnircunha on 9/28/15.
 */
var db = require('./dao');

function UserDao () {
    UserDao.prototype.list = function(result){
        db.all("select id, name, votes from tb_user", function (err, rows) {
            result(err, rows);
        });
    };
    UserDao.prototype.getByName = function(name, result) {
        db.get("select id, name, password, active from tb_user where name = ?", name, function (err, row) {
            result(err, row);
        });
    };
}

module.exports = new UserDao();