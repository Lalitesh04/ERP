import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import axios from 'axios';
import APIS from './APIS';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ApproveRegistration() {
  const [students, setStudents] = useState([]); // State to hold student data
  const [isLoading, setIsLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  // Fetch students from the server
  const fetchStudents = async () => {
    setIsLoading(true); // Set loading to true before fetching data
    try {
      const response = await axios.get(APIS.VIEW_ALL_STUDENTS);
      setStudents(response.data); // Store fetched data in state
      setError(null); // Reset error
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Failed to fetch student data.');
    } finally {
      setIsLoading(false); // Stop loading after data fetch
    }
  };

  // Fetch students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  // Approve or reject student registration
  const handleAction = async (studentId, value) => {
    try {
      const response = await axios.post(
        `${APIS.APPROVE_STUDENT_REGISTRATION}?studentId=${studentId}&value=${value}`
      );
      fetchStudents(); // Refresh the student list after action
    } catch (error) {
      console.error('Error updating registration status:', error);
      toast.error('Failed to update student status. Please try again.');
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

        {/* Notifications */}
        <ToastContainer />

        {/* Loading, Error, or Students Table */}
        {isLoading ? (
          <p className="text-center text-gray-600">Loading students...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : students.length === 0 ? (
          <p className="text-center text-green-600">No pending registrations found.</p>
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
                    <td className="py-2 px-4 border text-center">{index + 1}</td>
                    <td className="py-2 px-4 border text-center">{student.studentId}</td>
                    <td className="py-2 px-4 border">{student.name}</td>
                    <td className="py-2 px-4 border text-center">
                      {student.approved === false ? 'Pending' : 'Approved'}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      <div className="space-x-2">
                        <button
                          onClick={() => handleAction(student.id, true)}
                          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(student.id, false)}
                          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
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
