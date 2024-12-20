import React, { useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import APIS from "../admin/APIS"; // Replace with your API routes

export default function ApplyLeave() {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  // Get today's date in yyyy-mm-dd format
  const today = new Date().toISOString().split("T")[0];

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Reset field-specific error
  };

  // Validate the form
  const validate = () => {
    let validationErrors = {};

    if (!formData.startDate) {
      validationErrors.startDate = "Start Date is required.";
    } else if (formData.startDate < today) {
      validationErrors.startDate = "Start Date cannot be in the past.";
    }

    if (!formData.endDate) {
      validationErrors.endDate = "End Date is required.";
    } else if (formData.endDate < formData.startDate) {
      validationErrors.endDate = "End Date cannot be earlier than Start Date.";
    }

    if (!formData.reason) {
      validationErrors.reason = "Reason for leave is required.";
    } else if (formData.reason.length < 10) {
      validationErrors.reason = "Reason must be at least 10 characters long.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return; // Stop submission if validation fails
    }

    const faculty = JSON.parse(localStorage.getItem("faculty")); // Fetch faculty details from localStorage
    if (!faculty) {
      setMessage("Faculty information not found. Please log in.");
      return;
    }

    const requestData = {
      facultyId: faculty.id, // Adjust based on your API requirements
      ...formData,
    };

    try {
      const response = await axios.post(APIS.APPLY_LEAVE, requestData, {
        headers: {
          "api-key": "1234567890",
        },
      }); // Replace with actual API endpoint
      if (response.status === 200) {
        setMessage("Leave application submitted successfully!");
        setFormData({ startDate: "", endDate: "", reason: "" }); // Reset form
      } else {
        setMessage("Failed to submit leave application. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting leave application:", error);
      setMessage("An error occurred while submitting your application.");
    }
  };

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Apply for Leave
        </h1>

        {message && <p className="text-center text-red-600 mb-4">{message}</p>}

        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="startDate"
              className="block text-gray-700 font-bold mb-2"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              min={today} // Prevent past dates
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            />
            {errors.startDate && (
              <p className="text-red-600 text-sm">{errors.startDate}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="endDate"
              className="block text-gray-700 font-bold mb-2"
            >
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              min={today} // Prevent past dates
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            />
            {errors.endDate && (
              <p className="text-red-600 text-sm">{errors.endDate}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="reason"
              className="block text-gray-700 font-bold mb-2"
            >
              Reason for Leave
            </label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            />
            {errors.reason && (
              <p className="text-red-600 text-sm">{errors.reason}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit Leave Application
          </button>
        </form>
      </div>
    </div>
  );
}
