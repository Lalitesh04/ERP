import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import APIS from "../admin/APIS"; // Replace with your actual API paths

export default function UploadContent() {
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch sections for dropdown
  useEffect(() => {
    const fetchSections = async () => {
        const faculty  =  JSON.parse(localStorage.getItem("faculty"));
      try {
        const response = await axios.get(`${APIS.VIEW_ALL_SECTIONS_BY_FACULTY}?facultyId=${faculty.id}`); // Replace with actual endpoint
        setSections(response.data);
      } catch (error) {
        console.error("Error fetching sections:", error);
        setMessage("Failed to fetch sections. Please try again.");
      }
    };

    fetchSections();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !selectedSection || !title) {
      setMessage("Please fill out all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("sectionId", selectedSection);
    formData.append("title", title);

    try {
      setIsSubmitting(true);
      setMessage("");
      const response = await axios.post(`${APIS.UPLOAD_CONTENT}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Content uploaded successfully!");
      setTitle("");
      setFile(null);
      setSelectedSection("");
    } catch (error) {
      console.error("Error uploading content:", error);
      setMessage("Failed to upload content. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex-1 p-8 bg-white">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Upload Content
        </h1>

        {message && (
          <p
            className={`text-center mb-4 ${
              message.includes("successfully") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <form
          className="max-w-lg mx-auto bg-gray-100 p-6 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          {/* Title Input */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-semibold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter title"
            />
          </div>

          {/* Section Dropdown */}
          <div className="mb-4">
            <label
              htmlFor="section"
              className="block text-gray-700 font-semibold mb-2"
            >
              Select Section
            </label>
            <select
              id="section"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>
                Choose a section
              </option>
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.course.courseName} - {section.sectionNo}
                </option>
              ))}
            </select>
          </div>

          {/* File Upload */}
          <div className="mb-4">
            <label
              htmlFor="file"
              className="block text-gray-700 font-semibold mb-2"
            >
              Upload File
            </label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
