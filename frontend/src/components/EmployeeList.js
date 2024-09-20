import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/employees/getEmployees"
        );
        setEmployees(response.data);
      } catch (error) {
        setError("Failed to fetch employees.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`http://localhost:5000/api/employees/${id}`); // delete api
        setEmployees(employees.filter((employee) => employee._id !== id));
      } catch (error) {
        setError("Failed to delete employee.");
      }
    }
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Employee List</h2>
        <Link to="/create-employee">
          <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
            Create Employee
          </button>
        </Link>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="px-4 py-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        />
      </div>

      <p className="mb-4">Total Employees: {filteredEmployees.length}</p>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Sr. No.</th>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Mobile</th>
            <th className="py-2 px-4 border-b">Designation</th>
            <th className="py-2 px-4 border-b">Gender</th>
            <th className="py-2 px-4 border-b">Course</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee, index) => (
            <tr key={employee._id}>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">
                {employee.imageURL ? (
                  <img
                    src={`http://localhost:5000/uploads/${employee.imageURL}`}
                    alt={employee.name}
                    className="h-12 w-12 object-cover rounded"
                  />
                ) : (
                  <span>No Image</span>
                )}
              </td>
              <td className="py-2 px-4 border-b">{employee.name}</td>
              <td className="py-2 px-4 border-b">{employee.email}</td>
              <td className="py-2 px-4 border-b">{employee.mobile}</td>
              <td className="py-2 px-4 border-b">{employee.designation}</td>
              <td className="py-2 px-4 border-b">{employee.gender}</td>
              <td className="py-2 px-4 border-b">{employee.course}</td>
              <td className="py-2 px-4 border-b">
                <Link to={`/edit-employee/${employee._id}`}>
                  <button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(employee._id)}
                  className="bg-red-500 text-white py-1 px-2 rounded ml-2 hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
