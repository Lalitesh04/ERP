import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import APIS from "../admin/APIS"; // Adjust the import path to your API constants

export default function ViewAllPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const storedStudent = JSON.parse(localStorage.getItem("student"));
        if (!storedStudent || !storedStudent.id) {
          throw new Error("Student details not found in local storage.");
        }

        const response = await axios.get(
          `${APIS.VIEW_ALL_PAYMENTS}?studentId=${storedStudent.id}`,
          {
              headers: {
                  'api-key': '1234567890',
              },
          }
        );
        console.log(response.data);
        if (response.status === 200) {
          setPayments(response.data);
        } else {
          throw new Error("Failed to fetch payments.");
        }
      } catch (err) {
        console.error("Error fetching payments:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return (
      <div className="flex">
        <SideBar />
        <div className="flex-1 bg-gray-100 min-h-screen p-8">
          <div className="text-center">
            <p className="text-blue-600 text-lg">Loading payments...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex">
        <SideBar />
        <div className="flex-1 bg-gray-100 min-h-screen p-8">
          <div className="text-center">
            <p className="text-red-500 text-lg">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 bg-gray-100 min-h-screen p-8">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
            All Payments
          </h1>

          {payments.length === 0 ? (
            <p className="text-center text-gray-600">No payments found.</p>
          ) : (
            <table className="w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border border-gray-300 p-3 text-left">#</th>
                  <th className="border border-gray-300 p-3 text-left">Date</th>
                  <th className="border border-gray-300 p-3 text-left">Type</th>
                  <th className="border border-gray-300 p-3 text-right">
                    Amount (₹)
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Status
                  </th>
                  <th className="border border-gray-300 p-3 text-left">
                    Transaction ID
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr
                    key={payment.transactionId}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="border border-gray-300 p-3">{index + 1}</td>
                    <td className="border border-gray-300 p-3">
                      {new Date(payment.paymentDate).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 p-3 uppercase">
                      {payment.feeType} Fee 
                    </td>
                    <td className="border border-gray-300 p-3 text-right">
                      ₹{payment.amount.toFixed(2)}
                    </td>
                    <td
                      className={`border border-gray-300 p-3 ${
                        payment.paymentStatus === "Success"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {payment.paymentStatus}
                    </td>
                    <td className="border border-gray-300 p-3">
                      {payment.transactionId}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
