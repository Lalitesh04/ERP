import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import APIS from "./APIS";

export default function AddCourse() {
  const [formData, setFormData] = useState({
    courseCode: "",
    courseName: "",
    credits: "",
    ltps: "",
    year: "",
    semester: "",
    facultyId: "",
  });

  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch faculty details to populate the dropdown
  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        setLoading(true);
        const response = await axios.get(APIS.VIEW_ALL_FACULTY, {
          headers: {
            "api-key": "1234567890",
          },
        });
        setFaculties(response.data);
      } catch (err) {
        console.error("Error fetching faculties:", err);
        setError("Failed to fetch faculties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchFaculties();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const response = await axios.post(APIS.ADD_COURSE, formData,{
          headers: {
            'api-key': '1234567890',
          },
  
      });
      console.log("Course added:", response.data);
      alert("Course added successfully!");
      setFormData({
        courseCode: "",
        courseName: "",
        credits: "",
        ltps: "",
        year: "",
        semester: "",
        facultyId: "",
      });
    } catch (err) {
      console.error("Error adding course:", err);
      setError("Failed to add course. Please check the form and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
    <SideBar />
    <div className="flex-1 p-8 bg-white shadow-md rounded-lg max-w-4xl mx-auto  mt-2">
      <h1 className="text-2xl font-bold text-blue-600 mb-8 text-center">
        Add Course
      </h1>
  
      {error && (
        <div className="mb-6 p-4 text-lg text-red-700 bg-red-100 border border-red-400 rounded-md">
          {error}
        </div>
      )}
  
      {loading ? (
        <div className="text-xl text-blue-500 font-semibold text-center">
          Loading...
        </div>
      ) : (
        <form className="flex flex-col gap-y-6" onSubmit={handleSubmit}>
          {/* Course Code */}
          <div className="flex flex-col">
            <label
              htmlFor="courseCode"
              className="text-sm font-medium text-gray-800 mb-2"
            >
              Course Code:
            </label>
            <input
              type="text"
              id="courseCode"
              name="courseCode"
              value={formData.courseCode}
              onChange={handleChange}
              placeholder="Enter course code"
              className="p-3 border border-gray-300 rounded-md w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
  
          {/* Course Name */}
          <div className="flex flex-col">
            <label
              htmlFor="courseName"
              className="text-sm font-medium text-gray-800 mb-2"
            >
              Course Name:
            </label>
            <input
              type="text"
              id="courseName"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              placeholder="Enter course name"
              className="p-3 border border-gray-300 rounded-md w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
  
          {/* Credits */}
          <div className="flex flex-col">
            <label
              htmlFor="credits"
              className="text-sm font-medium text-gray-800 mb-2"
            >
              Credits:
            </label>
            <input
              type="text"
              id="credits"
              name="credits"
              value={formData.credits}
              onChange={handleChange}
              placeholder="Enter credits"
              className="p-3 border border-gray-300 rounded-md w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
  
          {/* LTPS */}
          <div className="flex flex-col">
            <label
              htmlFor="ltps"
              className="text-sm font-medium text-gray-800 mb-2"
            >
              LTPS:
            </label>
            <input
              type="text"
              id="ltps"
              name="ltps"
              value={formData.ltps}
              onChange={handleChange}
              placeholder="Enter LTPS"
              className="p-3 border border-gray-300 rounded-md w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
  
          {/* Year and Semester */}
          <div className="flex space-x-6">
            <div className="flex-1 flex flex-col">
              <label
                htmlFor="year"
                className="text-sm font-medium text-gray-800 mb-2"
              >
                Year:
              </label>
              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Year</option>
                <option value="2023-24">2023-24</option>
                <option value="2024-25">2024-25</option>
              </select>
            </div>
  
            <div className="flex-1 flex flex-col">
              <label
                htmlFor="semester"
                className="text-sm font-medium text-gray-800 mb-2"
              >
                Semester:
              </label>
              <select
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Semester</option>
                <option value="Odd">Odd</option>
                <option value="Even">Even</option>
                <option value="Summer">Summer</option>
              </select>
            </div>
          </div>
  
          {/* Faculty Select */}
          <div className="flex flex-col">
            <label
              htmlFor="facultyId"
              className="text-sm font-medium text-gray-800 mb-2"
            >
              Select CC:
            </label>
            <select
              id="facultyId"
              name="facultyId"
              value={formData.facultyId}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select CC</option>
              {faculties.map((faculty) => (
                <option key={faculty.id} value={faculty.id}>
                  {faculty.name}
                </option>
              ))}
            </select>
          </div>
  
          <button
            type="submit"
            className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Add Course"}
          </button>
        </form>
      )}
    </div>
  </div>
  
  );
}
