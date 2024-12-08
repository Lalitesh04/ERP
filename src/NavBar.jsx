import React, { useState } from "react";
import { Link } from "react-router-dom";
import SwaggerEmbed from "./SwaggerEmbed"; // Import the SwaggerEmbed component

export default function NavBar() {
  const [showSwagger, setShowSwagger] = useState(false);

  const toggleSwagger = () => {
    setShowSwagger((prev) => !prev);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-blue-700 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-8 py-4 flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-4xl font-extrabold tracking-tight">
            <Link to="/" className="hover:text-blue-300 transition duration-300">
              ERP
            </Link>
          </h1>

          {/* Navigation Links */}
          <div className="flex space-x-8 items-center">
            <Link
              to="/login"
              className="hover:text-blue-300 transition duration-300 text-lg font-medium"
            >
              Login
            </Link>
            <Link
              to="/team"
              className="hover:text-blue-300 transition duration-300 text-lg font-medium"
            >
              Team
            </Link>
            <Link
              to="/contact"
              className="hover:text-blue-300 transition duration-300 text-lg font-medium"
            >
              Contact
            </Link>

            {/* Swagger UI Toggle Button */}
            <button
              onClick={toggleSwagger}
              className="bg-white text-blue-700 px-6 py-2 rounded-lg shadow-lg hover:bg-blue-100 transition duration-300"
            >
              {showSwagger ? "Close Swagger UI" : "Swagger UI"}
            </button>
          </div>
        </div>
      </nav>

      {/* Render Swagger UI if toggled */}
      {showSwagger && <SwaggerEmbed toggleSwagger={toggleSwagger} />}
    </div>
  );
}
