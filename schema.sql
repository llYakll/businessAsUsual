-- Drop the database if it exists
DROP DATABASE IF EXISTS employee_db;

-- Create the employee_db database if it does not exist
CREATE DATABASE IF NOT EXISTS employee_db;
USE employee_db;

-- Create departments table
CREATE TABLE departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Create roles table
CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- Create employees table
CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  department_id INT,
  role_id INT,
  salary DECIMAL(10, 2),
  FOREIGN KEY (department_id) REFERENCES departments(id),
  FOREIGN KEY (role_id) REFERENCES roles(id)
);


INSERT INTO departments (name) VALUES
  ('Sales'),
  ('Finance'),
  ('Marketing');


INSERT INTO roles (title, salary, department_id) VALUES
  ('Manager', 75000.00, 1),  -- Manager role in Sales department
  ('Specialist', 60000.00, 1),  -- Specialist role in Sales department
  ('Manager', 80000.00, 2),  -- Manager role in Finance department
  ('Specialist', 65000.00, 2),  -- Specialist role in Finance department
  ('Manager', 70000.00, 3),  -- Manager role in Marketing department
  ('Specialist', 60000.00, 3);  -- Specialist role in Marketing department



-- Sales Department 
INSERT INTO employees (first_name, last_name, department_id, role_id, salary)
VALUES
  ('John', 'Doe', 1, 1, 75000.00),  
  ('Jane', 'Smith', 1, 2, 60000.00), 
  ('Mike', 'Johnson', 1, 2, 60000.00),
  ('Sarah', 'Williams', 1, 2, 60000.00),
  ('David', 'Brown', 1, 2, 60000.00),
  ('Emily', 'Davis', 1, 2, 60000.00),
  ('Alex', 'Wilson', 1, 2, 60000.00),
  ('Olivia', 'Taylor', 1, 2, 60000.00),
  ('Michael', 'Martinez', 1, 2, 60000.00),
  ('Sophia', 'Anderson', 1, 2, 60000.00);

-- Finance Department
INSERT INTO employees (first_name, last_name, department_id, role_id, salary)
VALUES
  ('James', 'Garcia', 2, 3, 80000.00),  
  ('Emma', 'Lopez', 2, 4, 65000.00),  
  ('Liam', 'Hernandez', 2, 4, 65000.00),
  ('Noah', 'Miller', 2, 4, 65000.00),
  ('Ella', 'Moore', 2, 4, 65000.00),
  ('Logan', 'Young', 2, 4, 65000.00),
  ('Grace', 'Lee', 2, 4, 65000.00),
  ('William', 'Wright', 2, 4, 65000.00),
  ('Sofia', 'King', 2, 4, 65000.00),
  ('Mason', 'Adams', 2, 4, 65000.00);

-- Marketing Department 
INSERT INTO employees (first_name, last_name, department_id, role_id, salary)
VALUES
  ('Ava', 'Perez', 3, 5, 70000.00),  
  ('William', 'Gonzalez', 3, 6, 60000.00), 
  ('Ethan', 'Evans', 3, 6, 60000.00),
  ('Madison', 'Hill', 3, 6, 60000.00),
  ('Jackson', 'Baker', 3, 6, 60000.00),
  ('Brooklyn', 'Bell', 3, 6, 60000.00),
  ('Mia', 'Ward', 3, 6, 60000.00),
  ('Alexander', 'Cox', 3, 6, 60000.00),
  ('Luna', 'Diaz', 3, 6, 60000.00),
  ('Lucas', 'Reed', 3, 6, 60000.00);