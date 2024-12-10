import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import axios from "axios";
import APIS from "./APIS";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ApproveRegistration() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch students from the server
  const fetchStudents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(APIS.VIEW_ALL_STUDENTS, {
        headers: {
          "api-key": "1234567890",
        },
      });
      setStudents(response.data || []);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError("Unable to fetch student data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle student registration approval/rejection
  const handleAction = async (studentId, value) => {
    if (!studentId) {
      toast.error("Invalid student ID. Please refresh and try again.");
      return;
    }

    try {
      await axios.post(
        `${APIS.APPROVE_STUDENT_REGISTRATION}`,
        {},
        {
          params: { studentId, value },
          headers: { "api-key": "1234567890" },
        }
      );
      toast.success(`Student registration ${value ? "approved" : "rejected"}.`);
      fetchStudents();
    } catch (err) {
      console.error("Error updating student registration status:", err);
      toast.error("Failed to update registration status. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Approve Student Registrations
        </h1>

        {/* Toast Notifications */}
        <ToastContainer />

        {/* Loading, Error, or Students Table */}
        {isLoading ? (
          <p className="text-center text-gray-600">Loading student data...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : students.length === 0 ? (
          <p className="text-center text-green-600">
            No pending registrations found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-lg shadow">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-2 px-4 border">#</th>
                  <th className="py-2 px-4 border">Student ID</th>
                  <th className="py-2 px-4 border">Student Name</th>
                  <th className="py-2 px-4 border">Status</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student.id} className="hover:bg-gray-100 transition">
                    <td className="py-2 px-4 border text-center">
                      {index + 1}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {student.studentId}
                    </td>
                    <td className="py-2 px-4 border">{student.name}</td>
                    <td className="py-2 px-4 border text-center">
                      <span
                        className={`font-bold ${
                          student.approved
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {student.approved ? "Approved" : "Pending"}
                      </span>
                    </td>
                    <td className="py-2 px-4 border text-center">
                      <div className="space-x-2">
                        <button
                          onClick={() => handleAction(student.id, true)}
                          disabled={student.approved}
                          className={`px-4 py-2 rounded-md transition ${
                            student.approved
                              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                              : "bg-green-500 text-white hover:bg-green-600"
                          }`}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(student.id, false)}
                          disabled={student.approved === false}
                          className={`px-4 py-2 rounded-md transition ${
                            student.approved === false
                              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                              : "bg-red-500 text-white hover:bg-red-600"
                          }`}
                        >
                          Reject
                        </button>
                      </div>
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
