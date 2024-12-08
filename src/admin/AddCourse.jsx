import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from './SideBar';
import APIS from './APIS';

export default function AddCourse() {
  const [formData, setFormData] = useState({
    courseCode: '',
    courseName: '',
    credits: '',
    ltps: '',
    year: '',
    semester: '',
    facultyId: '', 
  });
  
  const [faculties, setFaculties] = useState([]); // Store list of faculties

  // Fetch faculty details to populate the dropdown
  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await axios.get(APIS.VIEW_ALL_FACULTY,{
          headers: {
              'api-key': '1234567890',
          },
      }); // Assuming this endpoint returns all faculty details
        setFaculties(response.data);
      } catch (error) {
        console.error('Error fetching faculties:', error);
        alert('Failed to fetch faculties.');
      }
    };
    fetchFaculties();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    console.log(formData);
    
    e.preventDefault();

    try {
      const response = await axios.post(APIS.ADD_COURSE, formData);
      console.log('Course added:', response.data);
      alert('Course added successfully!');
    } catch (error) {
      console.error('Error adding course:', error);
      alert('Failed to add course.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar />
      <div className="flex-1 p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto mt-4 mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Add Course</h1>

        <form className="flex flex-col gap-y-6" onSubmit={handleSubmit}>
          {/* Course Code */}
          <div className="flex flex-col mb-4">
            <label htmlFor="courseCode" className="text-lg font-semibold text-gray-700">Course Code:</label>
            <input
              type="text"
              id="courseCode"
              name="courseCode"
              value={formData.courseCode}
              onChange={handleChange}
              placeholder="Enter course code"
              className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Course Name */}
          <div className="flex flex-col mb-4">
            <label htmlFor="courseName" className="text-lg font-semibold text-gray-700">Course Name:</label>
            <input
              type="text"
              id="courseName"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              placeholder="Enter course name"
              className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Credits */}
          <div className="flex flex-col mb-4">
            <label htmlFor="credits" className="text-lg font-semibold text-gray-700">Credits:</label>
            <input
              type="text"
              id="credits"
              name="credits"
              value={formData.credits}
              onChange={handleChange}
              placeholder="Enter credits"
              className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* LTPS */}
          <div className="flex flex-col mb-4">
            <label htmlFor="LTPS" className="text-lg font-semibold text-gray-700">LTPS:</label>
            <input
              type="text"
              id="LTPS"
              name="LTPS"
              value={formData.LTPS}
              onChange={handleChange}
              placeholder="Enter LTPS"
              className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Year and Semester */}
          <div className="flex space-x-6 mb-4">
            {/* Year Dropdown */}
            <div className="flex-1">
              <label htmlFor="year" className="text-lg font-semibold text-gray-700">Year:</label>
              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select Year</option>
                <option value="2023-24">2023-24</option>
                <option value="2024025">2024025</option>
              </select>
            </div>

            {/* Semester Dropdown */}
            <div className="flex-1">
              <label htmlFor="semester" className="text-lg font-semibold text-gray-700">Semester:</label>
              <select
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select Semester</option>
                <option value="Odd">Odd</option>
                <option value="Even">Even</option>
                <option value="Summer">Summer</option>
              </select>
            </div>
          </div>

          {/* Faculty Select */}
          <div className="flex flex-col mb-4">
            <label htmlFor="facultyId" className="text-lg font-semibold text-gray-700">Select CC:</label>
            <select
              id="facultyId"
              name="facultyId"
              value={formData.facultyId}
              onChange={handleChange}
              className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select CC</option>
              {faculties.map((faculty) => (
                <option key={faculty.id} value={faculty.id}>
                  {faculty.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
}
