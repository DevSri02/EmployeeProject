import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js"; // Used to hash the password
import { useNavigate } from "react-router-dom"; // Import useNavigate
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Only set the admin credentials if they haven't been set yet
    // only one time admin will  save its credential to LOCAL STORAGE
    if (!localStorage.getItem("username")) {
      localStorage.setItem("username", "admin");
      localStorage.setItem("password", CryptoJS.SHA256("admin123").toString());
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Hash the password
  const hashPassword = (password) => {
    return CryptoJS.SHA256(password).toString(); // Returns the hashed password
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = formData; // Get username and password from state

    const hashedPassword = hashPassword(password);

    // Retrieve stored credentials from localStorage
    const storedUsername = localStorage.getItem("username");
    const storedHashedPassword = localStorage.getItem("password");

    // Check if username and password match the stored credentials
    if (
      username === storedUsername &&
      hashedPassword === storedHashedPassword
    ) {
      alert("Login successful");
      navigate("/dashboard"); // Redirect to Dashboard upon successful login
    } else {
      alert("Invalid login credentials");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-4xl font-bold mb-4">Login</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-800"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
