const pool = require('./connection');

// execute SQL queries
async function query(sql) {
  try {
    const connection = await pool.getConnection();
    try {
      const [results, fields] = await connection.execute(sql);
      return results;
    } finally {
      connection.release();
    }
  } catch (error) {
    throw new Error(`Error executing query: ${error.message}`);
  }
}

// get all employees with details
async function getAllEmployees() {
  try {
    const employees = await query(`
      SELECT e.id, e.first_name, e.last_name, e.role_id, e.department_id, r.title AS role, d.name AS department, r.salary
      FROM employees e
      INNER JOIN roles r ON e.role_id = r.id
      INNER JOIN departments d ON e.department_id = d.id
    `);

    
    const mappedEmployees = employees.map(emp => ({
      id: emp.id,
      first_name: emp.first_name,
      last_name: emp.last_name,
      role_id: emp.role_id,
      department_id: emp.department_id,
      role: emp.role,
      department: emp.department,
      salary: emp.salary
    }));

    return mappedEmployees;
  } catch (error) {
    throw new Error(`Error fetching all employees: ${error.message}`);
  }
}
//get all departments with employee and manager details
async function getAllDepartments() {
  try {
    const departments = await query(`
      SELECT d.name AS department,
             COUNT(e.id) AS num_employees,
             SUM(CASE WHEN r.title = 'Manager' THEN 1 ELSE 0 END) AS num_managers,
             GROUP_CONCAT(CASE WHEN r.title = 'Manager' THEN CONCAT(e.first_name, ' ', e.last_name) ELSE NULL END) AS managers
      FROM departments d
      LEFT JOIN employees e ON d.id = e.department_id
      LEFT JOIN roles r ON e.role_id = r.id
      GROUP BY d.name
    `);
    return departments;
  } catch (error) {
    throw new Error(`Error fetching all departments: ${error.message}`);
  }
}

// get all roles with department and employee count
async function getAllRoles() {
  try {
    const roles = await query(`
      SELECT r.id AS role_id,
             r.title AS role,
             d.name AS department,
             COUNT(e.id) AS num_employees
      FROM roles r
      LEFT JOIN employees e ON r.id = e.role_id
      LEFT JOIN departments d ON r.department_id = d.id
      GROUP BY r.id, r.title, d.name
    `);
    return roles;
  } catch (error) {
    throw new Error(`Error fetching all roles: ${error.message}`);
  }
}

// Export functions
module.exports = {
  getAllEmployees,
  getAllDepartments,
  getAllRoles
};

