import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import APIS from "../admin/APIS";

export default function StudentRegistrationCourses() {
  const [studentCourses, setStudentCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudentCourses = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await axios.get(APIS.VIEW_ALL_REGISTERED_COURSES, {
          headers: {
            "api-key": "1234567890",
          },
        }); // Replace with the actual API endpoint
        setStudentCourses(response.data || []);
      } catch (error) {
        console.error("Error fetching student courses:", error);
        setError(
          "Failed to fetch registered student courses. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentCourses();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 p-8 bg-white rounded-lg shadow-lg max-w-6xl mx-auto mt-4">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          All Student Registered Courses
        </h1>

        {isLoading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : studentCourses.length === 0 ? (
          <p className="text-center text-gray-600">
            No registered courses found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="py-2 px-4 border">#</th>
                  <th className="py-2 px-4 border">Student ID</th>
                  <th className="py-2 px-4 border">Course Name</th>
                  <th className="py-2 px-4 border">Course Code</th>
                  <th className="py-2 px-4 border">Section</th>
                  <th className="py-2 px-4 border">Faculty Name</th>
                </tr>
              </thead>
              <tbody>
                {studentCourses.map((mapping, index) => (
                  <tr key={mapping.id} className="hover:bg-gray-100 transition">
                    <td className="py-2 px-4 border text-center">
                      {index + 1}
                    </td>
                    <td className="py-2 px-4 border">
                      {mapping.student?.studentId || "N/A"}
                    </td>
                    <td className="py-2 px-4 border">
                      {mapping.course?.courseName || "N/A"}
                    </td>
                    <td className="py-2 px-4 border">
                      {mapping.course?.courseCode || "N/A"}
                    </td>
                    <td className="py-2 px-4 border">
                      {mapping.section?.sectionNo || "N/A"}
                    </td>
                    <td className="py-2 px-4 border">
                      {mapping.section?.faculty?.name || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
