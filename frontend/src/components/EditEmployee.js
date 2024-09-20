import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
    imageURL: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employees/getEmployees/${id}` // connection to backend get api
        );
        console.log("Fetched employee:", response.data); // for debugging
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching employee:", error);
        setError("Failed to fetch employee data.");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the PUT request with the updated data as JSON
      const response = await axios.put(
        `http://localhost:5000/api/employees/${id}`,
        formData, // Sending the form data directly as JSON
        {
          headers: { "Content-Type": "application/json" }, // JSON content type
        }
      );
      console.log("Employee updated:", response.data); // Debug log
      navigate("/employee-list"); // Redirect after successful update
    } catch (error) {
      console.error("Error updating employee:", error);
      setError("Failed to update employee.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Edit Employee</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name || ""}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email || ""}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          value={formData.mobile || ""}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
        />
        <select
          name="designation"
          value={formData.designation || ""}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
        >
          <option value="">Select Designation</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
          <option value="HR">HR</option>
        </select>
        <div className="flex items-center space-x-4">
          <label>
            <input
              type="radio"
              name="gender"
              value="M"
              checked={formData.gender === "M"}
              onChange={handleChange}
              className="mr-2"
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="F"
              checked={formData.gender === "F"}
              onChange={handleChange}
              className="mr-2"
            />
            Female
          </label>
        </div>
        <select
          name="course"
          value={formData.course || ""}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
        >
          <option value="">Select Course</option>
          <option value="MCA">MCA</option>
          <option value="BCA">BCA</option>
          <option value="BSC">BSC</option>
        </select>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;
