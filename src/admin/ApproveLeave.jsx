import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import APIS from "../admin/APIS"; // Replace with your actual API paths

export default function ApproveLeave() {
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch leave applications
  const fetchLeaveApplications = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.get(APIS.VIEW_ALL_LEAVES, {
        headers: {
          "api-key": "1234567890",
        },
      });
      setLeaveApplications(response.data || []);
    } catch (err) {
      console.error("Error fetching leave applications:", err);
      setError("Failed to fetch leave applications. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveApplications();
  }, []);

  // Handle leave status update
  const handleUpdate = async (leaveId, status) => {
    if (!leaveId || !status) {
      alert("Invalid leave ID or status.");
      return;
    }

    try {
      await axios.post(
        APIS.UPDATE_LEAVE_STATUS,
        {},
        {
          params: { facultyLeaveId: leaveId, status },
          headers: { "api-key": "1234567890" },
        }
      );
      alert(`Leave status updated to ${status}.`);
      fetchLeaveApplications(); // Refresh the list
    } catch (err) {
      console.error("Error updating leave status:", err);
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
          <p className="text-center text-gray-600">
            Loading leave applications...
          </p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : leaveApplications.length === 0 ? (
          <p className="text-center text-gray-600">
            No leave applications found.
          </p>
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
                    <td className="py-2 px-4 border text-center">
                      {index + 1}
                    </td>
                    <td className="py-2 px-4 border">
                      {leave.faculty?.name || "N/A"}
                    </td>
                    <td className="py-2 px-4 border">
                      {leave.startDate || "N/A"}
                    </td>
                    <td className="py-2 px-4 border">
                      {leave.endDate || "N/A"}
                    </td>
                    <td className="py-2 px-4 border">
                      {leave.reason || "N/A"}
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
                      {leave.status || "Pending"}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      <div className="flex justify-center space-x-2">
                        {leave.status !== "Approved" && (
                          <button
                            onClick={() => handleUpdate(leave.id, "Approved")}
                            className="bg-green-600 text-white py-1 px-4 rounded-md hover:bg-green-700 transition"
                          >
                            Approve
                          </button>
                        )}
                        {leave.status !== "Rejected" && (
                          <button
                            onClick={() => handleUpdate(leave.id, "Rejected")}
                            className="bg-red-600 text-white py-1 px-4 rounded-md hover:bg-red-700 transition"
                          >
                            Reject
                          </button>
                        )}
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
