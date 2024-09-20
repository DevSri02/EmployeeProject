// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import EmployeeList from "./components/EmployeeList";
import Navbar from "./components/Navbar";
import CreateEmployee from "./components/createEmployee"; // Corrected import path
import EditEmployee from "./components/EditEmployee"; // Corrected import path
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="/create-employee" element={<CreateEmployee />} />
        <Route path="/edit-employee/:id" element={<EditEmployee />} />
      </Routes>
    </Router>
  );
};

export default App;
