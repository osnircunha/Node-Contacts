/**
 * Created by osnircunha on 9/28/15.
 */
var db = require('./dao');

function ContactDao () {
    this.list = function(result){
        db.all("select id, name, phone, email from tb_contact", function (err, rows) {
            result(err, rows);
        });
    };
    this.getById = function(id, result) {
        db.get("select id, name, phone, email from tb_contact where id = ?", id, function (err, row) {
            result(err, row);
        });
    };
    this.save = function (contact, result) {
        db.run("insert into tb_contact (name, phone, email) values (?, ?, ?)", contact.name, contact.phone, contact.email, function (err) {
            contact.id = this.lastID;
            result(err, contact);
        });
    };
    this.update = function (contact, result) {
        db.run("update tb_contact set name = ?, phone = ?, email = ? where id = ?", contact.name, contact.phone, contact.email, contact.id, function (err) {
            result(err);
        });
    };
    this.delete = function (id, result) {
        db.run("delete from tb_contact where id = ?", id, function (err) {
            result(err);
        });
    }
}

module.exports = new ContactDao();