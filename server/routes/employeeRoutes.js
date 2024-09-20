const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

// Create Employee
router.post("/", employeeController.createEmployee);

// Get All Employees
router.get("/getEmployees", employeeController.getAllEmployees);

// Get Single Employee by ID
router.get("/getEmployees/:id", employeeController.getEmployeeById);

// Update Employee
router.put("/:id", employeeController.updateEmployee);

// Delete Employee
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;
