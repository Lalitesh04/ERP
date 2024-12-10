import React, { useState, useEffect } from "react";
import axios from "axios";
import APIS from "./APIS"; // Replace with actual API configuration
import SideBar from "./SideBar"; // Replace with your actual Sidebar component

export default function FacultyCourseMapping() {
  const [faculties, setFaculties] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Fetch faculties and courses
  useEffect(() => {
    const fetchData = async () => {
      try {
        const axiosInstance = axios.create({
          headers: { "api-key": "1234567890" },
        });
        
        const facultiesResponse = await axios.get(APIS.VIEW_ALL_FACULTY,{
          headers: { "api-key": "1234567890" },
        })
        const coursesResponse = await axios.get(APIS.VIEW_ALL_COURSES,{
          headers: { "api-key": "1234567890" },
        })
      
        setFaculties(facultiesResponse.data || []);
        setCourses(coursesResponse.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to load faculties or courses.");
      }
    };

    fetchData();
  }, []);

  // Validate form inputs
  const validateForm = () => {
    const validationErrors = {};
    if (!selectedFaculty)
      validationErrors.selectedFaculty = "Faculty is required.";
    if (!selectedCourse)
      validationErrors.selectedCourse = "Course is required.";
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const mappingRequest = {
      facultyId: selectedFaculty,
      courseId: selectedCourse,
    };

    try {
      await axios.post(APIS.ADD_COURSE_FACULTY_MAPPING, mappingRequest, {
        headers: { "api-key": "1234567890" },
      });
      alert("Mapping added successfully!");
      setSelectedFaculty("");
      setSelectedCourse("");
      setErrors({});
    } catch (error) {
      console.error("Error submitting mapping:", error);
      alert("Failed to map faculty to course. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto mt-4 mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Faculty-Course Mapping
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Faculty Dropdown */}
          <div>
            <label
              htmlFor="faculty"
              className="block text-lg font-semibold text-gray-700"
            >
              Select Faculty:
            </label>
            <select
              id="faculty"
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                errors.selectedFaculty
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
              value={selectedFaculty}
              onChange={(e) => {
                setSelectedFaculty(e.target.value);
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  selectedFaculty: null,
                }));
              }}
            >
              <option value="">-- Select Faculty --</option>
              {faculties.map((faculty) => (
                <option key={faculty.id} value={faculty.id}>
                  {faculty.name} (ID: {faculty.id})
                </option>
              ))}
            </select>
            {errors.selectedFaculty && (
              <p className="text-red-500 text-sm">{errors.selectedFaculty}</p>
            )}
          </div>

          {/* Course Dropdown */}
          <div>
            <label
              htmlFor="course"
              className="block text-lg font-semibold text-gray-700"
            >
              Select Course:
            </label>
            <select
              id="course"
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                errors.selectedCourse
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
              value={selectedCourse}
              onChange={(e) => {
                setSelectedCourse(e.target.value);
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  selectedCourse: null,
                }));
              }}
            >
              <option value="">-- Select Course --</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.courseName} ({course.courseCode})
                </option>
              ))}
            </select>
            {errors.selectedCourse && (
              <p className="text-red-500 text-sm">{errors.selectedCourse}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Mapping..." : "Add Mapping"}
          </button>
        </form>
      </div>
    </div>
  );
}
