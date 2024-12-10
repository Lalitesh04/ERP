import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import APIS from "./APIS"; // Replace this with your actual API configuration

export default function ViewAllFacultyCourseMapping() {
  const [mappings, setMappings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(""); // For error tracking

  // Fetch all mappings
  useEffect(() => {
    const fetchMappings = async () => {
      setIsLoading(true); // Set loading to true at the start of the API call
      setError(""); // Clear previous errors
      try {
        const response = await axios.get(APIS.VIEW_ALL_COURSE_FACULTY_MAPPING, {
          headers: {
            "api-key": "1234567890",
          },
        });

        if (response?.data) {
          setMappings(response.data); // Set the fetched data
        } else {
          setError("No data found.");
        }
      } catch (error) {
        console.error("Error fetching mappings:", error);
        setError("An unexpected error occurred while fetching data.");
      } finally {
        setIsLoading(false); // Ensure loading is false no matter what
      }
    };

    fetchMappings();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Section */}
      <SideBar />

      {/* Main Content Section */}
      <div className="flex-1 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Faculty-Course Mappings
        </h1>

        {/* Loading State */}
        {isLoading && <p className="text-center text-gray-600">Loading...</p>}

        {/* Error State */}
        {error && <div className="text-center text-red-600 mb-4">{error}</div>}

        {/* No Data State */}
        {!isLoading && mappings.length === 0 && !error && (
          <p className="text-center text-gray-600">
            No Faculty-Course Mappings Found
          </p>
        )}

        {/* Data Table */}
        {mappings.length > 0 && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="py-2 px-4 border text-center">Mapping ID</th>
                  <th className="py-2 px-4 border text-center">Faculty Name</th>
                  <th className="py-2 px-4 border text-center">Faculty ID</th>
                  <th className="py-2 px-4 border text-center">Course Name</th>
                  <th className="py-2 px-4 border text-center">Course Code</th>
                </tr>
              </thead>
              <tbody>
                {mappings.map((mapping) => (
                  <tr key={mapping.id} className="hover:bg-gray-100 transition">
                    <td className="py-2 px-4 border text-center">
                      {mapping.id}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {mapping.faculty?.name ?? "N/A"}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {mapping.faculty?.id ?? "N/A"}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {mapping.course?.courseName ?? "N/A"}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {mapping.course?.courseCode ?? "N/A"}
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
