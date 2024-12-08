import React, { useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import APIS from "./APIS";

export default function AddStudent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    birthDate: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post(APIS.ADD_STUDENT, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "api-key":"1234567890"
        },
      });
      console.log("Student added:", response.data);
      alert("Student added successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add student.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar />
      <div className="flex-1 p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto mt-4 mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Add Student</h1>
        <form className="flex flex-col gap-y-6" onSubmit={handleSubmit}>
          {/* First Row: Name and Email */}
          <div className="flex space-x-6 mb-4">
            <div className="flex-1">
              <label htmlFor="name" className="text-lg font-semibold text-gray-700">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
                className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="email" className="text-lg font-semibold text-gray-700">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          {/* Second Row: Phone and Gender */}
          <div className="flex space-x-6 mb-4">
            <div className="flex-1">
              <label htmlFor="phone" className="text-lg font-semibold text-gray-700">
                Phone Number:
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="gender" className="text-lg font-semibold text-gray-700">
                Gender:
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Third Row: Address, Birth Date, and Image */}
          <div className="flex space-x-6 mb-4">
            <div className="flex-1">
              <label htmlFor="address" className="text-lg font-semibold text-gray-700">
                Address:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="birthDate" className="text-lg font-semibold text-gray-700">
                Birth Date:
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
        
          </div>
          <div className="flex-1">
              <label htmlFor="image" className="text-lg font-semibold text-gray-700">
                Image:
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
                className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

          <button
            type="submit"
            className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
}
