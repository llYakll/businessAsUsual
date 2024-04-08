const pool = require('./connection'); 

async function updateEmployee(employeeId, updatedEmployeeInfo) {
  try {
    if(!updatedEmployeeInfo) {
        throw new Error('updateEmployeeInfo is undefined, or null.')
    }

    const { first_name, last_name, department_id, role_id, salary } = updatedEmployeeInfo;

    console.log('Updating employee with the following information:');
    console.log('First Name:', first_name);
    console.log('Last Name:', last_name);
    console.log('Department ID:', department_id);
    console.log('Role ID:', role_id);
    console.log('Salary:', salary);

    // sql query refer to schema if ever edited
    const query = `
      UPDATE employees
      SET
        first_name = ?,
        last_name = ?,
        department_id = ?,
        role_id = ?,
        salary = ?
      WHERE
        id = ?
    `;

    // Execute the SQL query using a prepared statement to prevent SQL injection
    const [result] = await pool.execute(query, [first_name, last_name, department_id, role_id, salary, employeeId]);

    // Check the result to determine if the update was successful
    if (result.affectedRows > 0) {
      console.log(`Employee with ID ${employeeId} updated successfully.`);
      return true; // Return true means were good!
    } else {
      console.log(`Employee with ID ${employeeId} not found.`);
      return false; // Return false if no employee was found
    }
  } catch (error) {
    console.error(`Error updating employee with ID ${employeeId}: ${error.message}`);
    throw error;
  }
}

module.exports = {
  updateEmployee,
};