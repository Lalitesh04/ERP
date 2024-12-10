import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import APIS from "../admin/APIS"; // Replace with actual API paths

export default function ViewAllLeaves() {
  const [leaveRecords, setLeaveRecords] = useState([]); // State for leave records
  const [isLoading, setIsLoading] = useState(true); // Manage loading state
  const [error, setError] = useState(""); // Manage error state

  useEffect(() => {
    const fetchLeaves = async () => {
      setIsLoading(true); // Start loading
      setError(""); // Clear any previous errors
      try {
        const response = await axios.get(APIS.VIEW_ALL_LEAVES, {
          headers: {
            "api-key": "1234567890",
          },
        });

        if (response?.data) {
          setLeaveRecords(response.data);
        } else {
          setError("No leave records found.");
        }
      } catch (err) {
        console.error("Error fetching leave records:", err);
        setError("Failed to fetch leave records. Please try again later.");
      } finally {
        setIsLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchLeaves();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          View All Leave Applications
        </h1>

        {/* Loading State */}
        {isLoading && <p className="text-center text-gray-600">Loading...</p>}

        {/* Error State */}
        {error && <p className="text-center text-red-600 mb-4">{error}</p>}

        {/* No Data State */}
        {!isLoading && leaveRecords.length === 0 && !error && (
          <p className="text-center text-gray-600">
            No leave records available.
          </p>
        )}

        {/* Table with Data */}
        {leaveRecords.length > 0 && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="py-2 px-4 border text-center">#</th>
                  <th className="py-2 px-4 border text-center">Faculty Name</th>
                  <th className="py-2 px-4 border text-center">Start Date</th>
                  <th className="py-2 px-4 border text-center">End Date</th>
                  <th className="py-2 px-4 border text-center">Reason</th>
                  <th className="py-2 px-4 border text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {leaveRecords.map((leave, index) => (
                  <tr
                    key={leave.id}
                    className="hover:bg-gray-100 transition duration-200"
                  >
                    <td className="py-2 px-4 border text-center">
                      {index + 1}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {leave.faculty?.name ?? "N/A"}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {leave.startDate ?? "N/A"}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {leave.endDate ?? "N/A"}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {leave.reason ?? "N/A"}
                    </td>
                    <td
                      className={`py-2 px-4 border text-center font-bold ${
                        leave.status === "Approved"
                          ? "text-green-600"
                          : leave.status === "Rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {leave.status ?? "N/A"}
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
