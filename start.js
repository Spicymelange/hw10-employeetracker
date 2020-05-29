const { prompt } = require("inquirer");
const cTable = require("console.table");
const db = require("./database");

//get dept done
async function getDepts(dept) {
  const department = await db.getDepts(dept);
  console.table(department);
}
//add dept done, working okay, connection consoles after prompt renders
async function addDept() {
  const newDept = await prompt([
    {
      name: "name",
      message: "What is the name of the department?"
    }
  ]);
  await db.addDept(newDept.name);
  console.log(newDept.name + " added to departments")
}

//delete dept done
async function delDept(obj) {
  const departments = await db.getDepts();
  const arr = [];
  for (let i = 0; i < departments.length; i++) {
    let obj = {};
    obj.name = departments[i].name;
    arr.push(obj);
  }
  console.log(arr);
  const department = await prompt([
    {
      type: "list",
      name: "dept_name",
      message: "Which department do you want to delete?",
      choices: arr
    }
  ]);
  console.log(department.dept_name);
  await db.delDept(department.dept_name);
  console.table(department.dept_name + " department deleted");
  getDepts();
}

//Show all roles done
async function getRoles() {
  const roles = await db.getRoles();
  console.table(roles);
}

//Add role done
async function addRole() {
  const department = await db.getDepts();
  const arr = [];
  for (let i = 0; i < department.length; i++) {
    let obj = {};
    obj.name = department[i].name;
    obj.value = department[i].id;
    arr.push(obj);
  }
  // console.log(arr);
  const role = await prompt([
    {
      name: "title",
      message: "What is the name of the role?",
    },
    {
      name: "salary",
      message: "What is the salary of the role?",
    },
    {
      type: "list",
      name: "department_id",
      message: "Which department does the role belong to?",
      choices: arr
    }
  ]);
  console.log(arr);
  console.log(role.department_id);
  await db.addRole(role.title, role.salary, role.department_id);
  console.log("role added");
}
//delete role done
async function delRole() {
  const roles = await db.getRoles();
  const arr = [];
  for (let i = 0; i < roles.length; i++) {
    let obj = {};
    obj.name = roles[i].title;
    arr.push(obj);
  }
  console.log(arr);
  const department = await prompt([
    {
      type: "list",
      name: "role_name",
      message: "Which role do you want to delete?",
      choices: arr
    }
  ]);
  console.log(department.role_name);
  await db.delRole(department.role_name);
  console.table(department.role_name + " role deleted");
  getRoles();
}
  
//Add employee done
async function addEmployee() {
  const role = await db.getRoles();
  const arr = [];
  for (let i = 0; i < role.length; i++) {
    let obj = {};
    obj.name = role[i].title;
    obj.value = role[i].department_id;
    arr.push(obj);
  }
  console.log(arr);
  const employee = await prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?",
    },
    {
      name: "last_name",
      message: "What is the employee's last name?",
    },
    {
      type: "list",
      name: "role_id",
      message: "What is the role?",
      choices: arr
    },
    {
      name: "manager_id",
      message: "What is their manager's id number?"
    }
  ]);
  await db.addEmployee(employee.first_name, employee.last_name, employee.role_id, employee.manager_id);
  console.log("employee added");
}
// getDepts();
// addDept();
// delDept();
// getRoles();
// addRole();
// delRole();
// addEmployee();
// get
//which queries should have seperate files?
//view employees
//view employees by department (Join?)
//view employees by role (Join?)
//update employee role
//bonus
//update empoyee managers
//view employees by managers (Join?)
//delete departments, roles, employees
//call in inquirer when needed

//========================================================
// getDepts(); //view all departments
// addDept("Mail"); //add dept
// delDept("Mail"); //delete dept
// getRoles(); //view all roles
// addRole("CEO",300000);
// delRole("CEO");

//========================================================
//insert with SET (pass in pbject to query) columns === questions.name
//Add dept