import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./SideBar"; // Replace with actual path
import APIS from "./APIS"; // Replace with actual API configuration

export default function ViewAllSections() {
  const [sections, setSections] = useState([]); // State for storing sections data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error handling state

  // Fetch sections from the API
  useEffect(() => {
    const fetchSections = async () => {
      setIsLoading(true); // Start loading
      setError(""); // Clear any previous errors
      try {
        const response = await axios.get(APIS.VIEW_ALL_SECTIONS, {
          headers: {
            "api-key": "1234567890",
          },
        });
        if (response?.data) {
          setSections(response.data);
        } else {
          setError("No sections data found.");
        }
      } catch (error) {
        console.error("Error fetching sections:", error);
        setError("Failed to fetch sections. Please try again later.");
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchSections();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 p-8 bg-white rounded-lg shadow-lg max-w-6xl mx-auto mt-4 mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          View All Sections
        </h1>

        {/* Handle loading state */}
        {isLoading && <p className="text-center text-gray-600">Loading...</p>}

        {/* Handle error state */}
        {error && <p className="text-center text-red-600 mb-4">{error}</p>}

        {/* Handle no data state */}
        {!isLoading && !error && sections.length === 0 && (
          <p className="text-center text-gray-600">No sections available.</p>
        )}

        {/* Sections Table */}
        {!isLoading && !error && sections.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="py-2 px-4 border text-center">Section ID</th>
                  <th className="py-2 px-4 border text-center">Semester</th>
                  <th className="py-2 px-4 border text-center">Section No</th>
                  <th className="py-2 px-4 border text-center">Course</th>
                  <th className="py-2 px-4 border text-center">Faculty</th>
                  <th className="py-2 px-4 border text-center">Capacity</th>
                </tr>
              </thead>
              <tbody>
                {sections.map((section) => (
                  <tr
                    key={section.id}
                    className="hover:bg-gray-100 transition duration-200"
                  >
                    <td className="py-2 px-4 border text-center">
                      {section.id}
                    </td>
                    <td className="py-2 px-4 border uppercase text-center">
                      {section.course ? section.course.semester : "No Course"}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {section.sectionNo}
                    </td>
                    <td className="py-2 px-4 border text-lg text-center">
                      {section.course
                        ? `${section.course.courseName} (${section.course.courseCode})`
                        : "No Course"}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {section.faculty
                        ? `${section.faculty.name} (ID: ${section.faculty.id})`
                        : "No Faculty"}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {section.capacity}
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
