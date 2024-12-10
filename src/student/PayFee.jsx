import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import axios from "axios";
import APIS from "../admin/APIS";

export default function PayFee() {
  const [student, setStudent] = useState(null);
  const [feeAmount, setFeeAmount] = useState("");
  const [feeType, setFeeType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const storedStudent = JSON.parse(localStorage.getItem("student"));
        if (storedStudent) {
          setStudent(storedStudent);
        } else {
          setError("Student details not found.");
        }
      } catch (err) {
        setError("Error fetching student details.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, []);

  const handlePayment = () => {
    if (!feeAmount || parseFloat(feeAmount) <= 0) {
      alert("Please enter a valid Fee Amount greater than 0.");
      return;
    }

    if (!feeType) {
      alert("Please select a Fee Type.");
      return;
    }

    const options = {
      key: "rzp_test_Uhtl0BJG22vFeZ", // Replace with your Razorpay test key
      amount: parseFloat(feeAmount) * 100, // Convert to paise
      currency: "INR",
      name: "Acme Corp",
      description: `Fee Payment - ${feeType}`,
      image: "https://example.com/logo.png", // Optional company logo
      handler: async function (response) {
        const paymentDetails = {
          studentId: student.id,
          feeType: feeType,
          amount: parseFloat(feeAmount),
          transactionId: response.razorpay_payment_id,
          paymentStatus: "Success",
        };

        try {
          const apiResponse = await axios.post(APIS.PAY_FEE, paymentDetails,{
            headers: {
                'api-key': '1234567890',
            },
  
          });

          if (apiResponse.status === 200) {
            alert("Payment Successful and Registered!");
          } else {
            alert("Failed to register payment. Please try again.");
          }
        } catch (error) {
          console.error("Error processing payment:", error);
          alert("An error occurred while registering the payment.");
        }
      },
      prefill: {
        name: student?.name || "",
        email: student?.email || "",
        contact: student?.contactno || "",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new Razorpay(options);
    razorpay.on("payment.failed", function (response) {
      alert("Payment failed: " + response.error.description);
    });
    razorpay.open();
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 bg-gray-100 min-h-screen p-8">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
            Pay Your Fee
          </h1>

          {student ? (
            <div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Fee Type:
                </label>
                <select
                  value={feeType}
                  onChange={(e) => setFeeType(e.target.value)}
                  className="w-full p-3 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Fee Type</option>
                  <option value="Tuition">Tuition</option>
                  <option value="Hostel">Hostel</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Fee Amount (₹):
                </label>
                <input
                  type="number"
                  value={feeAmount}
                  onChange={(e) => setFeeAmount(e.target.value)}
                  className="w-full p-3 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handlePayment}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                Pay ₹{feeAmount || 0}
              </button>
            </div>
          ) : (
            <p className="text-center text-gray-600">Loading student details...</p>
          )}
        </div>
      </div>
    </div>
  );
}