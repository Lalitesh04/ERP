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

  // Fetch all faculties and courses
  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await axios.get(APIS.VIEW_ALL_FACULTY,
          {
              headers: {
                  'api-key': '1234567890',
              },
          }); // Replace with actual endpoint
        setFaculties(response.data);
      } catch (error) {
        console.error("Error fetching faculties:", error);
        alert("Failed to load faculties.");
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get(APIS.VIEW_ALL_COURSES,
          {
              headers: {
                  'api-key': '1234567890',
              },
          }); // Replace with actual endpoint
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        alert("Failed to load courses.");
      }
    };

    fetchFaculties();
    fetchCourses();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!selectedFaculty || !selectedCourse) {
      alert("Please select both faculty and course.");
      setIsSubmitting(false);
      return;
    }

    const mappingRequest = {
      facultyId: selectedFaculty,
      courseId: selectedCourse,
    };

    try {
      await axios.post(APIS.ADD_COURSE_FACULTY_MAPPING, mappingRequest,
        {
            headers: {
                'api-key': '1234567890',
            },
        }); // Replace with actual endpoint
      alert("Mapping added successfully!");
      setSelectedFaculty("");
      setSelectedCourse("");
    } catch (error) {
      console.error("Error submitting mapping:", error);
      alert("Failed to map faculty to course.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Faculty-Course Mapping</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Faculty Dropdown */}
          <div>
            <label htmlFor="faculty" className="block text-lg font-semibold text-gray-700">
              Select Faculty:
            </label>
            <select
              id="faculty"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
            >
              <option value="">-- Select Faculty --</option>
              {faculties.map((faculty) => (
                <option key={faculty.id} value={faculty.id}>
                  {faculty.name} (ID: {faculty.id})
                </option>
              ))}
            </select>
          </div>

          {/* Course Dropdown */}
          <div>
            <label htmlFor="course" className="block text-lg font-semibold text-gray-700">
              Select Course:
            </label>
            <select
              id="course"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">-- Select Course --</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.courseName} ({course.courseCode})
                </option>
              ))}
            </select>
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
