import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Users, BarChart3 } from 'lucide-react';
import SwaggerEmbed from "./SwaggerEmbed"; // Import SwaggerEmbed component

export default function MainHome() {
  const [showSwagger, setShowSwagger] = useState(false);

  const toggleSwagger = () => {
    setShowSwagger((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-16 text-center text-white">
        <h1 className="mb-6 text-5xl font-extrabold">Welcome to ERP System</h1>
        <p className="mb-8 text-lg font-light">
          Streamline your institution's fee management and student data tracking effortlessly.
        </p>
        <nav className="flex justify-center gap-6">
          <Link
            to="/login"
            className="rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 shadow-md transition duration-300 hover:bg-gray-100"
          >
            Login
          </Link>
          <Link
            to="/team"
            className="rounded-lg bg-indigo-800 px-8 py-3 font-semibold text-white shadow-md transition duration-300 hover:bg-indigo-700"
          >
            Team
          </Link>
          <Link
            to="/contact"
            className="rounded-lg bg-blue-800 px-8 py-3 font-semibold text-white shadow-md transition duration-300 hover:bg-blue-700"
          >
            Contact
          </Link>
          {/* Swagger UI Button */}
          <button
            onClick={toggleSwagger}
            className="rounded-lg bg-yellow-600 px-8 py-3 font-semibold text-white shadow-md transition duration-300 hover:bg-yellow-500"
          >
            Open Swagger UI
          </button>
        </nav>
      </header>

      {/* Main Content Section */}
      <main className="container mx-auto px-6 py-12">
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
          Why Choose Our ERP System?
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Feature
            icon={FileText}
            title="Simplified Fee Management"
            description="Seamlessly handle student fees, generate receipts, and track payments in real-time."
          />
          <Feature
            icon={Users}
            title="Student Dashboard"
            description="Empower students with a self-service portal to view their details and payment history."
          />
          <Feature
            icon={BarChart3}
            title="Advanced Admin Tools"
            description="Efficiently manage student records, monitor payments, and generate insightful reports."
          />
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 px-6 py-12 text-center text-white">
        <h3 className="mb-4 text-2xl font-bold">
          Take the Next Step in Streamlining Your Institution!
        </h3>
        <p className="mb-6 text-gray-300">
          Log in to access your personalized dashboard or contact our team for more information.
        </p>
        <nav className="flex justify-center gap-6">
          <Link
            to="/login"
            className="flex items-center rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition duration-300 hover:bg-blue-700"
          >
            Login <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            to="/team"
            className="flex items-center rounded-lg bg-indigo-600 px-8 py-3 font-semibold text-white shadow-md transition duration-300 hover:bg-indigo-700"
          >
            Team <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            to="/contact"
            className="flex items-center rounded-lg bg-gray-700 px-8 py-3 font-semibold text-white shadow-md transition duration-300 hover:bg-gray-600"
          >
            Contact <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </nav>
      </footer>

      {/* Render Swagger UI if toggled */}
      {showSwagger && <SwaggerEmbed toggleSwagger={toggleSwagger} />}
    </div>
  );
}

function Feature({ icon: Icon, title, description }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md transition duration-300 hover:shadow-lg">
      <div className="mb-4 flex items-center">
        <Icon className="mr-2 h-6 w-6 text-blue-600" />
        <h3 className="text-xl font-bold text-blue-600">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
