import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <Link to="/" className="hover:text-blue-300 transition">
            ERP
          </Link>
        </h1>

        {/* Navigation Links */}
        <div className="space-x-6 text-lg">
          <Link
            to="/login"
            className="hover:text-blue-300 transition"
          >
            Login
          </Link>
          <Link
            to="/team"
            className="hover:text-blue-300 transition"
          >
            Team
          </Link>
          <Link
            to="/contact"
            className="hover:text-blue-300 transition"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
