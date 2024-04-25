import React from "react";
import { Link } from "react-router-dom";


const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      {/* Logos */}

      {/* Main content */}
      <h1 className="text-4xl font-bold text-center mb-4">
        Restaurant
      </h1>


      {/* Buttons */}
      <Link to="/login" className="bg-gray-800 text-white hover:bg-white hover:text-gray-800 border-3 border-gray-800 px-6 py-3 rounded-2xl font-semibold text-lg text-center mb-4 w-80">
        Login
      </Link>
      <Link to="/register" className="bg-gray-800 text-white hover:bg-white hover:text-gray-800 border-3 border-gray-800 px-6 py-3 rounded-2xl font-semibold text-lg text-center w-80">
        Register
      </Link>
    </div>
  );
};

export default Landing;
