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

  async validateRole(title) {
    const roles = await this.getRoles();
    for (let i = 0; i < roles.length; i++) {
      const element = roles[i].title;
      if (title !== element) {
        return true;
      }
      else { return false; }
    }
  }

  addRole(title, salary, deptId) {
    try {
      return this.connection.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)",
        [title, salary, deptId]
      );
    }
    catch (err) {
      console.log(err);
    }
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
    var queryStr = "DELETE FROM employee WHERE id = ?";
    return this.connection.query(queryStr, [emp_id]);
  }

  updateEmployeeRole(role_id, emp_id) {
    //pass the new role_id and emp id
    connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [
      role_id,
      emp_id,
    ]);
  }
}
module.exports = new DB(connection);
