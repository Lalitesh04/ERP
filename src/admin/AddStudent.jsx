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
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone number must be 10 digits.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.address) newErrors.address = "Address is required.";
    if (!formData.birthDate) newErrors.birthDate = "Birth date is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post(APIS.ADD_STUDENT, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "api-key": "1234567890",
        },
      });
      alert("Student added successfully!");
      console.log("Student added:", response.data);
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        gender: "",
        birthDate: "",
        image: null,
      });
    } catch (error) {
      console.error("Error adding student:", error);
      alert(error.response?.data?.message || "Failed to add student.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar />
      <div className="flex-1 p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto mt-4 mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Add Student</h1>
        <form className="flex flex-col gap-y-6" onSubmit={handleSubmit}>
          {/* Name and Email */}
          <div className="flex space-x-6">
            <div className="flex-1">
              <label className="text-lg font-semibold text-gray-700">
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
                className="p-3 border border-gray-300 rounded-md w-full"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name}</span>
              )}
            </div>
            <div className="flex-1">
              <label className="text-lg font-semibold text-gray-700">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="p-3 border border-gray-300 rounded-md w-full"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>
          </div>

          {/* Phone and Gender */}
          <div className="flex space-x-6">
            <div className="flex-1">
              <label className="text-lg font-semibold text-gray-700">
                Phone:
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="p-3 border border-gray-300 rounded-md w-full"
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">{errors.phone}</span>
              )}
            </div>
            <div className="flex-1">
              <label className="text-lg font-semibold text-gray-700">
                Gender:
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md w-full"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <span className="text-red-500 text-sm">{errors.gender}</span>
              )}
            </div>
          </div>

          {/* Address, Birth Date, and Image */}
          <div className="flex space-x-6">
            <div className="flex-1">
              <label className="text-lg font-semibold text-gray-700">
                Address:
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                className="p-3 border border-gray-300 rounded-md w-full"
              />
              {errors.address && (
                <span className="text-red-500 text-sm">{errors.address}</span>
              )}
            </div>
            <div className="flex-1">
              <label className="text-lg font-semibold text-gray-700">
                Birth Date:
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md w-full"
              />
              {errors.birthDate && (
                <span className="text-red-500 text-sm">{errors.birthDate}</span>
              )}
            </div>
          </div>
          <div className="flex-1">
            <label className="text-lg font-semibold text-gray-700">
              Image:
            </label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="p-3 border border-gray-300 rounded-md w-full"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-6 px-6 py-3 ${
              isSubmitting ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
            } text-white font-semibold rounded-md`}
          >
            {isSubmitting ? "Submitting..." : "Add Student"}
          </button>
        </form>
      </div>
    </div>
  );
}
