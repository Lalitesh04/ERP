import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import APIS from "./APIS";

export default function ViewAllStudents() {
  const [students, setStudents] = useState([]); // State for storing students
  const [selectedImage, setSelectedImage] = useState(null); // State for modal image preview
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error handling state

  // Fetch all students
  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true); // Set loading state before fetching
      setError(""); // Clear any previous errors
      try {
        const response = await axios.get(APIS.VIEW_ALL_STUDENTS, {
          headers: { "api-key": "1234567890" },
        });
        if (response?.data) {
          setStudents(response.data);
        } else {
          setError("No student data found.");
        }
      } catch (error) {
        console.error("Error fetching students:", error);
        setError("Failed to fetch students. Please try again later.");
      } finally {
        setIsLoading(false); // End loading state
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          View All Students
        </h1>

        {/* Handle Loading State */}
        {isLoading && <p className="text-center text-gray-600">Loading...</p>}

        {/* Handle Error State */}
        {error && <p className="text-center text-red-600 mb-4">{error}</p>}

        {/* Handle Empty Data State */}
        {!isLoading && !error && students.length === 0 && (
          <p className="text-center text-gray-600">No students available.</p>
        )}

        {/* Students Table */}
        {!isLoading && !error && students.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="py-2 px-4 border text-center">ID</th>
                  <th className="py-2 px-4 border text-center">Student ID</th>
                  <th className="py-2 px-4 border">Name</th>
                  <th className="py-2 px-4 border">Email</th>
                  <th className="py-2 px-4 border">Phone</th>
                  <th className="py-2 px-4 border">Address</th>
                  <th className="py-2 px-4 border text-center">Gender</th>
                  <th className="py-2 px-4 border text-center">Birth Date</th>
                  <th className="py-2 px-4 border text-center">Image</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-gray-100 transition duration-200"
                  >
                    <td className="py-2 px-4 border text-center">
                      {student.id}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {student.studentId}
                    </td>
                    <td className="py-2 px-4 border">{student.name}</td>
                    <td className="py-2 px-4 border">{student.email}</td>
                    <td className="py-2 px-4 border">{student.phone}</td>
                    <td className="py-2 px-4 border">{student.address}</td>
                    <td className="py-2 px-4 border text-center">
                      {student.gender}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {student.birthDate}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {student.image ? (
                        <img
                          src={student.image}
                          alt={student.name}
                          className="h-12 w-12 rounded-full object-cover cursor-pointer"
                          onClick={() => setSelectedImage(student.image)}
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <div className="bg-white rounded-lg shadow-lg p-4 overflow-hidden">
              <img
                src={selectedImage}
                alt="Selected"
                className="max-w-full max-h-screen"
              />
              <button
                className="absolute top-4 right-4 bg-red-500 text-white rounded-full px-4 py-2 font-semibold"
                onClick={() => setSelectedImage(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
