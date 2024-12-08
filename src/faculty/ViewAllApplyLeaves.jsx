import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import APIS from "../admin/APIS"; // Import your API routes

export default function ViewAllApplyLeaves() {
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const faculty = JSON.parse(localStorage.getItem("faculty"));
    const fetchLeaveApplications = async () => {
      try {
        const response = await axios.get(`${APIS.VIEW_ALL_APPLY_LEAVES}?facultyId=${faculty.id}`,
          {
              headers: {
                  'api-key': '1234567890',
              },
          }); // Replace with actual API endpoint
        setLeaveApplications(response.data);
      } catch (error) {
        console.error("Error fetching leave applications:", error);
        setError("Failed to fetch leave applications.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaveApplications();
  }, []);

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex-1 p-8 bg-white">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Leave Applications
        </h1>

        {isLoading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : leaveApplications.length === 0 ? (
          <p className="text-center text-gray-600">No leave applications found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="py-2 px-4 border">#</th>
                  <th className="py-2 px-4 border">Faculty Name</th>
                  <th className="py-2 px-4 border">Start Date</th>
                  <th className="py-2 px-4 border">End Date</th>
                  <th className="py-2 px-4 border">Reason</th>
                  <th className="py-2 px-4 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {leaveApplications.map((leave, index) => (
                  <tr key={leave.id} className="hover:bg-gray-100 transition">
                    <td className="py-2 px-4 border text-center">{index + 1}</td>
                    <td className="py-2 px-4 border">{leave.faculty.name}</td>
                    <td className="py-2 px-4 border">{leave.startDate}</td>
                    <td className="py-2 px-4 border">{leave.endDate}</td>
                    <td className="py-2 px-4 border">{leave.reason}</td>
                    <td
                      className={`py-2 px-4 border text-center ${
                        leave.status === "approved"
                          ? "text-green-600"
                          : leave.status === "rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {leave.status}
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
