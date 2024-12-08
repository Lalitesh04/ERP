import React, { useState, useEffect } from "react";
import axios from "axios";
import APIS from "./APIS"; // Replace with the actual path to your API endpoints
import SideBar from "./SideBar";

export default function CreateSection() {
  const [courses, setCourses] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [formData, setFormData] = useState({
    courseId: "",
    sectionNo: "",
    capacity: "",
    facultyId: "",
  });

  // Fetch courses and faculties
  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesResponse = await axios.get(APIS.VIEW_ALL_COURSES,
          {
              headers: {
                  'api-key': '1234567890',
              },
          })
        const facultiesResponse = await axios.get(APIS.VIEW_ALL_FACULTY,
          {
              headers: {
                  'api-key': '1234567890',
              },
          })
        setCourses(coursesResponse.data);
        setFaculties(facultiesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch data.");
      }
    };
    fetchData();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(APIS.CREATE_SECTION, formData,
        {
            headers: {
                'api-key': '1234567890',
            },
        });
      console.log("Section created:", response.data);
      alert("Section created successfully!");
      setFormData({
        courseId: "",
        sectionNo: "",
        capacity: "",
        facultyId: "",
      });
    } catch (error) {
      console.error("Error creating section:", error);
      alert("Failed to create section.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto mt-4 mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Create Section</h1>
        <form className="flex flex-col gap-y-6" onSubmit={handleSubmit}>
          {/* Course Dropdown */}
          <div className="flex-1">
            <label htmlFor="courseId" className="text-lg font-semibold text-gray-700">
              Course:
            </label>
            <select
              id="courseId"
              name="courseId"
              value={formData.courseId}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.courseName} ({course.courseCode})
                </option>
              ))}
            </select>
          </div>

          {/* Section Number */}
          <div className="flex-1">
            <label htmlFor="sectionNo" className="text-lg font-semibold text-gray-700">
              Section No:
            </label>
            <input
              type="text"
              id="sectionNo"
              name="sectionNo"
              value={formData.sectionNo}
              onChange={handleChange}
              placeholder="Enter section number"
              className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Capacity */}
          <div className="flex-1">
            <label htmlFor="capacity" className="text-lg font-semibold text-gray-700">
              Capacity:
            </label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              placeholder="Enter capacity"
              className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Faculty Dropdown */}
          <div className="flex-1">
            <label htmlFor="facultyId" className="text-lg font-semibold text-gray-700">
              Faculty:
            </label>
            <select
              id="facultyId"
              name="facultyId"
              value={formData.facultyId}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select a faculty</option>
              {faculties.map((faculty) => (
                <option key={faculty.id} value={faculty.id}>
                  {faculty.name} (ID: {faculty.id})
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Create Section
          </button>
        </form>
      </div>
    </div>
  );
}
