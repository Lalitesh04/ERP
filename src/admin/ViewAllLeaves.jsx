import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import APIS from "../admin/APIS"; // Replace with actual API paths

export default function ViewAllLeaves() {
  const [leaveRecords, setLeaveRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch leave records
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(APIS.VIEW_ALL_LEAVES,
          {
              headers: {
                  'api-key': '1234567890',
              },
          }); // Replace with your actual endpoint
        setLeaveRecords(response.data);
        setError("");
      } catch (err) {
        console.error("Error fetching leave records:", err);
        setError("Failed to fetch leave records.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaves();
  }, []);

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex-1 p-8 bg-white">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          View All Leave Applications
        </h1>

        {isLoading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : leaveRecords.length === 0 ? (
          <p className="text-center text-gray-600">No leave records found.</p>
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
                {leaveRecords.map((leave, index) => (
                  <tr key={leave.id} className="hover:bg-gray-100 transition">
                    <td className="py-2 px-4 border text-center">{index + 1}</td>
                    <td className="py-2 px-4 border">{leave.faculty.name}</td>
                    <td className="py-2 px-4 border">{leave.startDate}</td>
                    <td className="py-2 px-4 border">{leave.endDate}</td>
                    <td className="py-2 px-4 border">{leave.reason}</td>
                    <td
                      className={`py-2 px-4 border text-center font-bold ${
                        leave.status === "Approved"
                          ? "text-green-600"
                          : leave.status === "Rejected"
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
