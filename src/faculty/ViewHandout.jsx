import React, { useEffect, useState } from "react";
import axios from "axios";
import APIS from "../admin/APIS";

export default function ViewHandout() {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedHandout, setSelectedHandout] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${APIS.VIEW_CC_COURSES}?facultyId=1`);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // Handle course selection
  const handleCourseSelection = (courseId) => {
    const selectedCourse = courses.find((course) => course.id === courseId);
    setSelectedCourseId(courseId);
    setSelectedHandout(selectedCourse?.handout);
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-4">View Handouts</h1>

      {/* Dropdown to select a course */}
      <select
        className="p-2 border border-gray-300 rounded mb-4"
        onChange={(e) => handleCourseSelection(Number(e.target.value))}
        value={selectedCourseId || ""}
      >
        <option value="" disabled>
          Select a Course
        </option>
        {courses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.courseName} ({course.courseCode})
          </option>
        ))}
      </select>

      {/* Handout Viewer */}
      <div>
        {selectedHandout ? (
          selectedHandout.trim() ? (
            <iframe
              src={selectedHandout}
              width="100%"
              height="600px"
              title="Handout Viewer"
              className="border rounded"
            ></iframe>
          ) : (
            <p className="text-red-600">No handout available for the selected course.</p>
          )
        ) : (
          <p className="text-gray-600">Please select a course to view the handout.</p>
        )}
      </div>
    </div>
  );
}
