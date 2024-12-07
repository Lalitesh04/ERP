import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import APIS from "./APIS"; // Replace with your actual API configuration

export default function ViewAllFacultyCourseMapping() {
  const [mappings, setMappings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all course-faculty mappings
  useEffect(() => {
    const fetchMappings = async () => {
      try {
        const response = await axios.get(APIS.VIEW_ALL_COURSE_FACULTY_MAPPING); // Replace with actual endpoint
        setMappings(response.data);
      } catch (error) {
        console.error("Error fetching mappings:", error);
        alert("Failed to fetch faculty-course mappings.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMappings();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Faculty-Course Mappings</h1>

        {isLoading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : mappings.length === 0 ? (
          <p className="text-center text-red-600">No Faculty-Course Mappings Found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="py-2 px-4 border">Mapping ID</th>
                  <th className="py-2 px-4 border">Faculty Name</th>
                  <th className="py-2 px-4 border">Faculty ID</th>
                  <th className="py-2 px-4 border">Course Name</th>
                  <th className="py-2 px-4 border">Course Code</th>
                </tr>
              </thead>
              <tbody>
                {mappings.map((mapping) => (
                  <tr key={mapping.id} className="hover:bg-gray-100 transition">
                    <td className="py-2 px-4 border text-center">{mapping.id}</td>
                    <td className="py-2 px-4 border">{mapping.faculty.name}</td>
                    <td className="py-2 px-4 border text-center">{mapping.faculty.id}</td>
                    <td className="py-2 px-4 border">{mapping.course.courseName}</td>
                    <td className="py-2 px-4 border">{mapping.course.courseCode}</td>
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
