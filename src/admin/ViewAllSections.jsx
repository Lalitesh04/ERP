import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./SideBar"; // Replace with the actual path
import APIS from "./APIS"; // Replace with the actual API configuration

export default function ViewAllSections() {
  const [sections, setSections] = useState([]);

  // Fetch all sections
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get(APIS.VIEW_ALL_SECTIONS);
        setSections(response.data);
      } catch (error) {
        console.error("Error fetching sections:", error);
        alert("Failed to fetch sections.");
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
        <h1 className="text-3xl font-bold text-blue-600 mb-6">View All Sections</h1>

        {/* Sections Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="py-2 px-4 border">Section ID</th>
                <th className="py-2 px-4 border">Semester</th>
                <th className="py-2 px-4 border">Section No</th>
                <th className="py-2 px-4 border">Course</th>
                <th className="py-2 px-4 border">Faculty</th>
                <th className="py-2 px-4 border">Capacity</th>
              </tr>
            </thead>
            <tbody>
              {sections.length > 0 ? (
                sections.map((section) => (
                  <tr key={section.id} className="hover:bg-gray-100 transition">
                    <td className="py-2 px-4 border text-center">{section.id}</td>
                    <td className="py-2 px-4 border uppercase">
                      {section.course ? (
                        <>
                           {section.course.semester} 
                        </>
                      ) : (
                        "No Course"
                      )}
                    </td>
                    <td className="py-2 px-4 border text-center">{section.sectionNo}</td>
                    <td className="py-2 px-4 text-lg border">
                      {section.course ? (
                        <>
                          {section.course.courseName} ({section.course.courseCode})
                        </>
                      ) : (
                        "No Course"
                      )}
                    </td>
                    <td className="py-2 px-4 border">
                      {section.faculty ? (
                        <>
                          {section.faculty.name} (ID: {section.faculty.id})
                        </>
                      ) : (
                        "No Faculty"
                      )}
                    </td>
                    <td className="py-2 px-4 border text-center">{section.capacity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 text-center text-gray-500">
                    No sections available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
