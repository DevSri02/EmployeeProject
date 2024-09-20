import React from "react";

const Dashboard = () => {
  return (
    <div className="flex h-1000 items-center justify-center ">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
          Welcome Admin Panel
        </h1>
        <p className="text-center text-gray-600">
          Manage your employees, view details, and perform actions using the
          admin panel.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
