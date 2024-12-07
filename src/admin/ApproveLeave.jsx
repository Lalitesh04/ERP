import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import APIS from "../admin/APIS"; // Replace with your API paths

export default function ApproveLeave() {
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch leave applications
  const fetchLeaveApplications = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(APIS.VIEW_ALL_LEAVES); // Replace with your actual endpoint
      setLeaveApplications(response.data);
      setError("");
    } catch (error) {
      console.error("Error fetching leave applications:", error);
      setError("Failed to fetch leave applications.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveApplications();
  }, []);

  // Handle leave status update
  const handleUpdate = async (leaveId, status) => {
    try {
      await axios.post(`${APIS.UPDATE_LEAVE_STATUS}`, null, {
        params: { facultyLeaveId: leaveId, status: status },
      });

      // Refresh the list after updating the status
      fetchLeaveApplications();
    } catch (error) {
      console.error("Error updating leave status:", error);
      alert("Failed to update leave status. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex-1 p-8 bg-white">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Approve Leave Applications
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
                  <th className="py-2 px-4 border">Actions</th>
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
                    <td className="py-2 px-4 border text-center">
                      
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleUpdate(leave.id, "Approved")}
                            className="bg-green-600 text-white py-1 px-4 rounded-md hover:bg-green-700 transition"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleUpdate(leave.id, "Rejected")}
                            className="bg-red-600 text-white py-1 px-4 rounded-md hover:bg-red-700 transition"
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
