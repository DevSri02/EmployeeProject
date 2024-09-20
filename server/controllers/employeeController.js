const Employee = require("../models/employeeModel");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const { promisify } = require("util");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).single("imageURL");

// Promisify the multer upload to use async/await
const uploadAsync = promisify(upload);

// Create Employee
exports.createEmployee = async (req, res) => {
  try {
    // Use uploadAsync to handle the file upload
    await uploadAsync(req, res);

    const newEmployee = new Employee({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      designation: req.body.designation,
      gender: req.body.gender,
      course: req.body.course,
      imageURL: req.file ? req.file.filename : null, // Handle file if exists
      createDate: new Date(), // Use current date if not passed
    });

    // Save the employee in the database
    const savedEmployee = await newEmployee.save();
    return res.status(200).json(savedEmployee); // Send saved employee back
  } catch (error) {
    console.error("Error creating employee:", error);
    return res.status(500).json({ error: error.message });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

////// Update Employee
// src/controllers/employeeController.js

exports.updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { ...req.body }, // Spread the body to handle all fields
      { new: true } // Return the updated document
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(400).json({ error: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
