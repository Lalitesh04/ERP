import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import APIS from "./APIS";

export default function ViewAllStudents() {
  const [students, setStudents] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch all students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(APIS.VIEW_ALL_STUDENTS,
          {
              headers: {
                  'api-key': '1234567890',
              },
          });
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
        alert("Failed to fetch students.");
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
        <h1 className="text-3xl font-bold text-blue-600 mb-6">View All Students</h1>

        {/* Student Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">Student ID</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Phone</th>
                <th className="py-2 px-4 border">Address</th>
                <th className="py-2 px-4 border">Gender</th>
                <th className="py-2 px-4 border">Birth Date</th>
                <th className="py-2 px-4 border">Image</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-gray-100 transition"
                >
                  <td className="py-2 px-4 border text-center">{student.id}</td>
                  <td className="py-2 px-4 border text-center">{student.studentId}</td>
                  <td className="py-2 px-4 border">{student.name}</td>
                  <td className="py-2 px-4 border">{student.email}</td>
                  <td className="py-2 px-4 border">{student.phone}</td>
                  <td className="py-2 px-4 border">{student.address}</td>
                  <td className="py-2 px-4 border text-center">{student.gender}</td>
                  <td className="py-2 px-4 border text-center">{student.birthDate}</td>
                  <td className="py-2 px-4 border text-center">
                    {student.image ? (
                      <img
                        src={student.image}
                        alt="Student"
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

        {/* Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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
