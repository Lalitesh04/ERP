import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import APIS from "./APIS"; // Assuming you have this for API endpoints

export default function ViewAllFeePayments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(APIS.VIEW_ALL_FEE_PAYMENTS,
          {
              headers: {
                  'api-key': '1234567890',
              },
          });
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching fee payments:", error);
        alert("Failed to fetch fee payments.");
      }
    };
    fetchPayments();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">View All Fee Payments</h1>

        {/* Fee Payments Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="py-2 px-4 border">#</th>
                <th className="py-2 px-4 border">Student ID</th>
                <th className="py-2 px-4 border">Student Name</th>
                <th className="py-2 px-4 border">Fee Type</th>
                <th className="py-2 px-4 border">Amount (₹)</th>
                <th className="py-2 px-4 border">Transaction ID</th>
                <th className="py-2 px-4 border">Payment Status</th>
                <th className="py-2 px-4 border">Payment Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment,index) => (
                <tr key={payment.transactionId} className="hover:bg-gray-100 transition">
                    <td className="py-2 px-4 border">{index +1}</td>
                    <td className="py-2 px-4 border text-center">
                      {payment.student.studentId}
                    </td>
                  <td className="py-2 px-4 border text-center">{payment.student.name}</td>
                  <td className="py-2 px-4 border">{payment.feeType}</td>
                  <td className="py-2 px-4 border">{payment.amount}</td>
                  <td className="py-2 px-4 border">{payment.transactionId}</td>
                  <td className="py-2 px-4 border">{payment.paymentStatus}</td>
                  <td className="py-2 px-4 border text-center">
                    {new Date(payment.paymentDate).toLocaleDateString()}
                 </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
