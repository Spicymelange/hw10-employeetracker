//database queries

const connection = require("./connection.js");

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  //methods
  getDepts() {
    return this.connection.query("SELECT * FROM department");
  }

  addDept(obj) {
    return this.connection.query(
      "INSERT INTO department (name) VALUES (?)",
      obj
    );
  }

  delDept(obj) {
    return this.connection.query(
      "DELETE FROM department WHERE name = (?)",
      obj
    );
  }

  getRoles() {
    return this.connection.query("SELECT * FROM role");
  }

  addRole(title, salary, deptId) {
    return this.connection.query(
      "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)",
      [title, salary, deptId]
    );
  }

  delRole(title) {
    return this.connection.query("DELETE FROM role WHERE title = (?)", title);
  }

  getEmployees() {
    return this.connection.query("SELECT * FROM employee");
  }

  addEmployee(first_name, last_name, role_id, manager_id) {
    return this.connection.query(
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
      [first_name, last_name, role_id, manager_id]
    );
  }

    delEmployee(emp_id) {
      var queryStr =
        "DELETE FROM employee WHERE id = ?";
    return this.connection.query(
      queryStr,
      [emp_id]
    );
  }

  updateEmployee() {
    //naming? can this update emp's manager and role?
  }
}
module.exports = new DB(connection);
