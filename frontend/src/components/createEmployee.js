import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
    imageURL: null,
  });

  const navigate = useNavigate(); // Hook for redirection

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imageURL: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Image file extension validation
    if (formData.imageURL) {
      const fileExtension = formData.imageURL.name
        .split(".")
        .pop()
        .toLowerCase();
      if (fileExtension !== "jpg" && fileExtension !== "png") {
        toast.error("Only .jpg and .png files are allowed!");
        return; // Stop form submission if invalid file type
      }
    }

    const form = new FormData();
    Object.keys(formData).forEach((key) => form.append(key, formData[key]));

    try {
      const response = await axios.post(
        "http://localhost:5000/api/employees",
        form,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        toast.success("Employee created successfully!");

        // Clear form after successful submission
        setFormData({
          name: "",
          email: "",
          mobile: "",
          designation: "",
          gender: "",
          course: "",
          imageURL: null,
        });

        // Redirect to Employee List after 2 seconds
        setTimeout(() => {
          navigate("/employee-list");
        }, 2000);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(
          error.response.data.message || "Failed to create employee."
        );
      } else {
        toast.error("Network error or server is down.");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h2 className="text-xl font-bold mb-4">Create Employee</h2>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="flex flex-col space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          value={formData.mobile}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
        />
        <select
          name="designation"
          value={formData.designation}
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
          value={formData.course}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
        >
          <option value="">Select Course</option>
          <option value="MCA">MCA</option>
          <option value="BCA">BCA</option>
          <option value="BSC">BSC</option>
        </select>
        <input
          type="file"
          name="imageURL"
          accept="image/*"
          onChange={handleFileChange}
          className="border px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Employee
        </button>
      </form>
    </div>
  );
};

export default CreateEmployee;
