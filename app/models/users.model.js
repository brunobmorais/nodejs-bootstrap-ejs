const sql = require("./db.js");
const TokenLib = require("../lib/token.lib");
const DataLib = require("../lib/date.lib");

// constructor
const usersModel = function (users) {
  if (users.id!==undefined)
    this.id =users.id;
  if (users.name!==undefined)
    this.name =users.name;
  if (users.email!==undefined)
    this.email = users.email;
  if (users.password!==undefined)
    this.password = users.password;
  if (users.datecreate!==undefined)
    this.datecreate = DataLib.getDateDatabase();
};

usersModel.insert = (users, result) => {
  sql.query("INSERT INTO users SET ?",
      users, (err, res, fields) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      let token = TokenLib.create(res.insertId);

      console.log("created customer: ", {id: res.insertId, ...users});
      result(null, {token: token, id: res.insertId, ...users});
    }
  });
};

usersModel.findUserEmail = (email, result) => {
  sql.query(`SELECT * FROM users WHERE email LIKE '${email}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found UsersModel with the id
    result({ kind: "not_found" }, null);
  });
};

usersModel.findById = (customerId, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${customerId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found UsersModel with the id
    result({ kind: "not_found" }, null);
  });
};

usersModel.getAll = (callBack) => {
  sql.query("SELECT * FROM users", [], (error, results, fields) => {
    if (error) {
      console.log("error: ", error);
      return callBack(null, error);
    } else {
      console.log("customers: ", results);
      return callBack(null, results);
    }
  });
};

usersModel.updateById = (id, users, result) => {
  sql.query(
    "UPDATE users SET email = ?, name = ? WHERE id = ?",
    [users.email, users.name, users.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found UsersModel with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...users });
      result(null, { id: id, ...users });
    }
  );
};

usersModel.remove = (id, result) => {
  sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found UsersModel with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};

usersModel.removeAll = result => {
  sql.query("DELETE FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};

module.exports = usersModel;
