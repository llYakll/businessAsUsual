const inquirer = require('inquirer');
const { getAllDepartments, getAllRoles, getAllEmployees } = require('./db/dataRetrieval');
const { updateEmployee } = require('./db/dataManipulation')
const consoleTable = require('console.table');

// display departments with employee counts
async function viewDepartments() {
  try {
    const departments = await getAllDepartments();
    console.log('\nAll Departments with Employee Counts:');
    console.table(departments);
  } catch (error) {
    console.error('Error fetching departments with employee counts:', error.message);
  }
}

// display roles with employee counts
async function viewRoles() {
  try {
    const roles = await getAllRoles();
    console.log('\nAll Roles with Employee Counts:');
    console.table(roles);
  } catch (error) {
    console.error('Error fetching roles with employee counts:', error.message);
  }
}

// display all employees with details
async function viewAllEmployees() {
  try {
    const employees = await getAllEmployees();
    console.log('\nAll Employees with Details:');
    console.table(employees);
  } catch (error) {
    console.error('Error fetching all employees with details:', error.message);
  }
}

// prompt user for employee editing
async function editEmployee() {
  try {
    const { employeeId } = await inquirer.prompt({
      name: 'employeeId',
      type: 'input',
      message: 'Enter the ID of the employee you want to edit:',
    });

    // Fetch existing employee details based on employeeId
    const employee = await fetchEmployeeById(employeeId);

    if (!employee) {
      console.log(`Employee with ID ${employeeId} not found.`);
      return;
    }

    // prompt user for updated employee information
    const updatedEmployeeInfo = await inquirer.prompt([
      {
        name: 'first_name',
        type: 'input',
        message: `Enter updated first name (current: ${employee.first_name}):`,
        default: employee.first_name,
      },
      {
        name: 'last_name',
        type: 'input',
        message: `Enter updated last name (current: ${employee.last_name}):`,
        default: employee.last_name,
      },
      {
        name:'department_id',
        type:'input',
        message:`Enter updated department ID (current: ${employee.department_id})`,
        default: employee.department_id,
      },
      {
        name:'role_id',
        type:'input',
        message:`Enter updated role ID (current: ${employee.role_id})`,
        default: employee.role_id,
      },
      {
        name:'salary',
        type:'input',
        message:`Enter updated Salary (current: ${employee.salary})`,
        default: employee.salary,
      }
      //in the future i can add more prompts here
    ]);

    // Update employee 
    await updateEmployee(employeeId, updatedEmployeeInfo);

    console.log(`Employee with ID ${employeeId} updated successfully.`);
  } catch (error) {
    console.error(`Error updating employee: ${error.message}`);
  }
}

// fetch employee details by ID
async function fetchEmployeeById(employeeId) {
  try {
  
    const employees = await getAllEmployees();
    const employee = employees.find(emp => emp.id === parseInt(employeeId));
    return employee;
  } catch (error) {
    console.error(`Error fetching employee with ID ${employeeId}: ${error.message}`);
    return null;
  }
}

// prompt user for selection
async function promptUser() {
  const choices = ['View Departments', 'View Roles', 'View All Employees', 'Edit Employee', 'Exit'];

  while (true) {
    const { choice } = await inquirer.prompt({
      name: 'choice',
      type: 'list',
      message: 'What would you like to view or do?',
      choices: choices,
    });

    console.log(`\nYou selected: ${choice}`);

    const actions = {
      'View Departments': viewDepartments,
      'View Roles': viewRoles,
      'View All Employees': viewAllEmployees,
      'Edit Employee': editEmployee,
      'Exit': () => {
        console.log('\nExiting the application...');
        process.exit(0); // Exit the app
      }
    };

    const chosenAction = actions[choice];
    if (chosenAction) {
      await chosenAction();
    } else {
      console.log('\nInvalid choice. Please try again.');
    }

    const { continueOption } = await inquirer.prompt({
      name: 'continueOption',
      type: 'confirm',
      message: 'Would you like to make another selection?',
      default: true,
    });

    if (!continueOption) {
      console.log('\nExiting the application...');
      break;
    }
  }
}

// Start 
promptUser();