import React, { useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import APIS from "./APIS";

export default function AddFaculty() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    birthDate: "",
    department: "",
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim() || formData.name.length < 3)
      newErrors.name = "Name must be at least 3 characters.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address.";
    if (!formData.phone || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone number must be 10 digits.";
    if (!formData.address.trim())
      newErrors.address = "Address cannot be empty.";
    if (!formData.gender) newErrors.gender = "Please select a gender.";
    if (!formData.department)
      newErrors.department = "Please select a department.";
    if (!formData.birthDate || new Date(formData.birthDate) > new Date())
      newErrors.birthDate = "Birth date cannot be in the future.";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    setIsSubmitting(true);
    try {
      const response = await axios.post(APIS.ADD_FACULTY, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "api-key": "1234567890",
        },
      });
      alert("Faculty added successfully!");
      console.log("Faculty added:", response.data);

      // Reset form on successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        gender: "",
        birthDate: "",
        department: "",
        image: null,
      });
      setErrors({});
    } catch (error) {
      console.error("Error adding faculty:", error);
      const errorMsg =
        error.response?.data?.message || "An error occurred. Please try again.";
      alert(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar />
      <div className="flex-1 p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto mt-4 mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Add Faculty</h1>
        <form className="flex flex-col gap-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="text-lg font-semibold text-gray-700"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              className={`p-3 border rounded-md w-full focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-2">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className={`p-3 border rounded-md w-full focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="mb-2">
            <label
              htmlFor="phone"
              className="text-sm font-semibold text-gray-700"
            >
              Phone:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              className={`p-3 border rounded-md w-full focus:outline-none focus:ring-2 ${
                errors.phone
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
              required
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Address */}
          <div className="mb-2">
            <label
              htmlFor="address"
              className="text-sm font-semibold text-gray-700"
            >
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleChange}
              className={`p-3 border rounded-md w-full focus:outline-none focus:ring-2 ${
                errors.address
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
              required
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          {/* Birth Date, Gender, and Department Row */}
          <div className="flex flex-wrap gap-4">
            {/* Birth Date */}
            <div className="flex-1">
              <label
                htmlFor="birthDate"
                className="text-sm font-semibold text-gray-700"
              >
                Birth Date:
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 ${
                  errors.birthDate
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-400"
                }`}
                required
              />
              {errors.birthDate && (
                <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>
              )}
            </div>

            {/* Gender */}
            <div className="flex-1">
              <label htmlFor="gender" className="text-sm font-semibold text-gray-700">
                Gender:
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 ${
                  errors.gender
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-400"
                }`}
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
              )}
            </div>

            {/* Department */}
            <div className="flex-1">
              <label
                htmlFor="department"
                className="text-sm font-semibold text-gray-700"
              >
                Department:
              </label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 ${
                  errors.department
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-400"
                }`}
                required
              >
                <option value="">Select department</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="CS&IT">CS&IT</option>
                <option value="CIVIL">CIVIL</option>
              </select>
              {errors.department && (
                <p className="text-red-500 text-sm mt-1">{errors.department}</p>
              )}
            </div>
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label
              htmlFor="image"
              className="text-sm font-semibold text-gray-700"
            >
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={` px-6 py-3 ${
              isSubmitting ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
            } text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
          >
            {isSubmitting ? "Submitting..." : "Add Faculty"}
          </button>
        </form>
      </div>
    </div>
  );
}
