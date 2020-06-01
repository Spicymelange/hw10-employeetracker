const { prompt } = require("inquirer");
const cTable = require("console.table");
const db = require("./database");
const logo = require("asciiart-logo");

// init();
// getRoles();
addRole();
// validateRoles();
// Display logo text, load main prompts
function init() {
  // Utilize asciiart-logo
  const logoText = logo({ name: "Employee Manager" }).render();

  console.log(logoText);

  loadMainPrompts();
}

async function loadMainPrompts() {
  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "\nWhat would you like to do?",
      choices: [
        {
          name: "View all Roles",
          value: "VIEW_ROLES",
        },
        {
          name: "Add a Role",
          value: "ADD_ROLE",
        },
        {
          name: "Delete a Role",
          value: "DELETE_ROLE",
        },
        {
          name: "View all Departments",
          value: "VIEW_DEPARTMENTS",
        },
        {
          name: "Add a Department",
          value: "ADD_DEPARTMENT",
        },
        {
          name: "Delete a Department",
          value: "DELETE_DEPARTMENT",
        },
        {
          name: "View all Employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "Add an Employee",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "Delete an Employee",
          value: "DELETE_EMPLOYEE",
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE",
        },

        // Quit
        {
          name: "Quit",
          value: "QUIT",
        },
      ],
    },
  ]);

  // Call the appropriate function depending on what the user chose
  switch (choice) {
    case "VIEW_DEPARTMENTS":
      return getDepts();
    case "ADD_DEPARTMENT":
      return addDept();
    case "DELETE_DEPARTMENT":
      return delDept();
    case "VIEW_ROLES":
      return getRoles();
    case "ADD_ROLE":
      return addRole();
    case "DELETE_ROLE":
      return delRole();
    case "VIEW_EMPLOYEES":
      return getEmployees();
    case "ADD_EMPLOYEE":
      return addEmployee();
    case "DELETE_EMPLOYEE":
      return delEmployee();
    case "UPDATE_EMPLOYEE_ROLE":
      return updateEmployeeRole();
    case "QUIT":
      return quit();
    // QUIT
    default:
      return loadMainPrompts();
  }
}

//get dept done
async function getDepts() {
  const department = await db.getDepts();
  console.table(department);
  loadMainPrompts();
}
//add dept done, working okay, connection consoles after prompt renders
async function addDept() {
  const newDept = await prompt([
    {
      name: "name",
      message: "What is the name of the department?",
    },
  ]);
  await db.addDept(newDept.name);
  console.log(newDept.name + " added to departments");
  loadMainPrompts();
}

//delete dept done
async function delDept() {
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
      choices: arr,
    },
  ]);
  console.log(department.dept_name);
  await db.delDept(department.dept_name);
  console.log(department.dept_name + " department deleted");
  getDepts();
  loadMainPrompts();
}

//Show all roles done
async function getRoles() {
  const roles = await db.getRoles();
  console.table(roles);
  loadMainPrompts();
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
  const role = await prompt([
    {
      message: "What is the name of the role?",
      type: "input",
      name: "title",
      validate: async function (value) {
        let roles = await db.getRoles();
        for (let i = 0; i < roles.length; i++) {
          if (value !== roles[i]) {
            return true;
          }
          else {
            return false;
          }
        }
      }
    },
    {
      name: "salary",
      message: "What is the salary of the role?"
    },
    {
      type: "list",
      name: "department_id",
      message: "Which department does the role belong to?",
      choices: arr
    },
  ]);
    await db.addRole(role.title, role.salary, role.department_id);
    console.log(role.title + "role added");
    loadMainPrompts();
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
      choices: arr,
    },
  ]);
  await db.delRole(department.role_name);
  console.table(department.role_name + " role deleted");
  getRoles();
  loadMainPrompts();
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
      choices: arr,
    },
    {
      name: "manager_id",
      message: "What is their manager's id number?",
    },
  ]);
  await db.addEmployee(
    employee.first_name,
    employee.last_name,
    employee.role_id,
    employee.manager_id
  );
  console.log("employee added");
  loadMainPrompts();
}

//get employees done
async function getEmployees() {
  const employees = await db.getEmployees();
  console.table(employees);
  loadMainPrompts();
}

//delete an employee done
async function delEmployee() {
  const employees = await db.getEmployees();
  const arr = [];
  for (let i = 0; i < employees.length; i++) {
    let obj = {};
    obj.name = employees[i].first_name + " " + employees[i].last_name;
    obj.value = employees[i].id;
    arr.push(obj);
  }
  console.log(arr);
  const employee = await prompt([
    {
      type: "list",
      name: "employee",
      message: "Which employee do you want to delete?",
      choices: arr,
    },
  ]);
  await db.delEmployee(employee.employee);
  console.log(employee.employee + "employee deleted");
  loadMainPrompts();
}

//update employee
async function updateEmployeeRole() {
  const employees = await db.getEmployees();
  const arr = [];
  for (let i = 0; i < employees.length; i++) {
    let obj = {};
    obj.name = employees[i].first_name + " " + employees[i].last_name;
    obj.value = employees[i].id;
    arr.push(obj);
  }
  console.log(arr);
  const employee = await prompt([
    {
      type: "list",
      name: "employee",
      message: "Which employee's role do you want to update?",
      choices: arr,
    },
  ]);
  console.log(employee.employee);
  const empToUpdate = employee.employee; //empId var
  const roles = await db.getRoles();
  const arr2 = [];
  for (let i = 0; i < roles.length; i++) {
    let obj = {};
    obj.name = roles[i].title;
    obj.value = roles[i].id;
    arr2.push(obj);
  }
  console.log(arr2);
  const role = await prompt([
    {
      type: "list",
      name: "role",
      message: "What role do you want to assign to this employee?",
      choices: arr2,
    },
  ]);
  const newRole = role.role;
  console.log("newRole" + role.role);
  await db.updateEmployeeRole(newRole, empToUpdate);
  console.log("Employee role updated.");
  loadMainPrompts();
}

function quit() {
  console.log("Goodbye!");
  process.exit();
}

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
