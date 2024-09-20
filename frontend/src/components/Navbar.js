import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token or any other data on logout
    navigate("/"); // Redirect to the login page after logout
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link to="/dashboard" className="hover:text-gray-300">
            Home
          </Link>
        </div>

        {/* Links aligned on the right */}
        <ul className="flex items-center space-x-6">
          <li className="text-white hover:text-gray-200">
            {localStorage.getItem("username")}
          </li>
          <li>
            <Link
              to="/employee-list"
              className="text-white hover:bg-blue-700 hover:text-gray-200 px-3 py-2 text-center rounded transition"
            >
              Employee List
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="text-white bg-red-500 hover:bg-red-600 px-3 py-2 text-center rounded transition"
            >
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
