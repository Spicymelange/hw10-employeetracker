var mysql = require("mysql");
const util = require("util");

var PORT = process.env.PORT || 3306;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "6Dexter",
  database: "employees",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

connection.query = util.promisify(connection.query);
module.exports = connection;