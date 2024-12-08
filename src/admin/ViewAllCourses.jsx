import React, { useState, useEffect } from "react";
import axios from "axios"; // Ensure you have axios installed
import APIS from "./APIS";
import SideBar from "./SideBar";
import { EyeIcon, XMarkIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";

export default function ViewAllCourses() {
  const [courses, setCourses] = useState([]);
  const [selectedHandout, setSelectedHandout] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(APIS.VIEW_ALL_COURSES,
          {
              headers: {
                  'api-key': '1234567890',
              },
          }); // Adjust the API endpoint accordingly
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        alert("Failed to fetch courses.");
      }
    };
    fetchCourses();
  }, []);

  const handleViewHandout = (handoutUrl) => {
    setSelectedHandout(handoutUrl);
    setIsModalOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar />
      <div className="flex-1 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          View All Courses
        </h1>

        {/* Course Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">Course Code</th>
                <th className="py-2 px-4 border">Course Name</th>
                <th className="py-2 px-4 border">Credits</th>
                <th className="py-2 px-4 border">LTPS</th>
                <th className="py-2 px-4 border">Year</th>
                <th className="py-2 px-4 border">Semester</th>
                <th className="py-2 px-4 border">CC</th>
                <th className="py-2 px-4 border">Handout</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-100 transition">
                  <td className="py-2 px-4 border text-center">{course.id}</td>
                  <td className="py-2 px-4 border text-center">
                    {course.courseCode}
                  </td>
                  <td className="py-2 px-4 border">{course.courseName}</td>
                  <td className="py-2 px-4 border text-center">
                    {course.credits}
                  </td>
                  <td className="py-2 px-4 border">{course.ltps}</td>
                  <td className="py-2 px-4 border text-center">
                    {course.year}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {course.semester}
                  </td>
                  <td className="py-2 px-4 border">
                    {course.cc
                      ? `${course.cc.id} - ${course.cc.name}`
                      : "No Faculty"}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {course.handout ? (
                      <button
                        onClick={() => handleViewHandout(course.handout)}
                        className="text-blue-600 hover:underline flex items-center justify-center"
                      >
                        <EyeIcon className="h-5 w-5 mr-1" />
                        View
                      </button>
                    ) : (
                      "No Handout"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Handout Viewer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div
            className="bg-white rounded-lg shadow-lg"
            style={{
              width: "calc(100% - 0.4cm)",
              height: "calc(100% - 0.4cm)",
              padding: "0.2cm",
            }}
          >
            <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-2">
              <h2 className="text-xl font-bold text-blue-600">
                Handout Viewer
              </h2>
              <div className="flex items-center space-x-3">
                {selectedHandout && (
                  <a
                    href={selectedHandout}
                    download
                    className="flex items-center text-blue-600 hover:underline"
                  >
                    <ArrowDownTrayIcon className="h-5 w-5 mr-1" />
                    Download
                  </a>
                )}
                <XMarkIcon
                  className="h-6 w-6 text-gray-500 cursor-pointer"
                  onClick={() => setIsModalOpen(false)}
                />
              </div>
            </div>
            <div className="relative w-full h-[calc(100%-3rem)]">
              {selectedHandout ? (
                <iframe
                  src={`${selectedHandout}#toolbar=0&zoom=fit`}
                  className="w-full h-full border rounded-lg"
                  title="Handout Viewer"
                ></iframe>
              ) : (
                <p className="text-gray-600 text-center text-lg">
                  No Handout Available
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
