import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import APIS from "./APIS"; // Replace this with your actual endpoint configuration

export default function ViewAllFeePayments() {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [error, setError] = useState(""); // Track any errors

  useEffect(() => {
    const fetchPayments = async () => {
      setIsLoading(true); // Set loading at the start
      setError(""); // Clear previous errors
      try {
        const response = await axios.get(APIS.VIEW_ALL_FEE_PAYMENTS, {
          headers: {
            "api-key": "1234567890",
          },
        });

        if (response?.data) {
          setPayments(response.data); // Set fetched data
        } else {
          setError("No fee payment records found.");
        }
      } catch (error) {
        console.error("Error fetching fee payments:", error);
        setError("Failed to fetch fee payments. Please try again.");
      } finally {
        setIsLoading(false); // Ensure loading stops after request
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Section */}
      <SideBar />

      {/* Main Content Section */}
      <div className="flex-1 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          View All Fee Payments
        </h1>

        {/* Loading State */}
        {isLoading && <p className="text-center text-gray-600">Loading...</p>}

        {/* Error State */}
        {error && <div className="text-center text-red-600 mb-4">{error}</div>}

        {/* No Data State */}
        {!isLoading && payments.length === 0 && !error && (
          <p className="text-center text-gray-600">No Fee Payments Found</p>
        )}

        {/* Fee Payments Table */}
        {payments.length > 0 && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="py-2 px-4 border text-center">#</th>
                  <th className="py-2 px-4 border text-center">Student ID</th>
                  <th className="py-2 px-4 border text-center">Student Name</th>
                  <th className="py-2 px-4 border text-center">Fee Type</th>
                  <th className="py-2 px-4 border text-center">Amount (₹)</th>
                  <th className="py-2 px-4 border text-center">
                    Transaction ID
                  </th>
                  <th className="py-2 px-4 border text-center">
                    Payment Status
                  </th>
                  <th className="py-2 px-4 border text-center">Payment Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr
                    key={payment.transactionId}
                    className="hover:bg-gray-100 transition"
                  >
                    <td className="py-2 px-4 border text-center">
                      {index + 1}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {payment.student?.studentId ?? "N/A"}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {payment.student?.name ?? "N/A"}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {payment.feeType ?? "N/A"}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {payment.amount ?? "N/A"}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {payment.transactionId ?? "N/A"}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {payment.paymentStatus ?? "N/A"}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {payment.paymentDate
                        ? new Date(payment.paymentDate).toLocaleDateString()
                        : "N/A"}
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
