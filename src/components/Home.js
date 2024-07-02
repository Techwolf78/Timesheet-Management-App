import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-green-500 flex flex-col items-center justify-center text-white">
      <div className="text-center mt-16">
        <h1 className="text-6xl font-bold mb-6">Welcome to ShiftSync</h1>
        <p className="text-2xl mb-4">
          An Employee Time-Entry Management System
        </p>
        <Link to="/login">
          <button className="bg-white text-blue-500 px-6 py-3 rounded-full shadow-lg hover:bg-gray-200 transition duration-300">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
