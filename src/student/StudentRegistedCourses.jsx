import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import APIS from "../admin/APIS";
import { EyeIcon } from "@heroicons/react/24/solid";
import Loader from "../Loader";

export default function StudentRegisteredCourses() {
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedHandout, setSelectedHandout] = useState(null); // For modal handout view
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchRegisteredCourses = async () => {
      const student = JSON.parse(localStorage.getItem("student"));
      try {
        if (!student) {
          alert("Student ID is not found in local storage.");
          return;
        }
        const response = await axios.get(
         ` ${APIS.VIEW_ALL_REGISTERED_COURSES_BY_STUDENT}?studentId=${student.studentId}`,{
            headers: {
              'api-key': '1234567890',
            }
         }
        );

        setRegisteredCourses(response.data);
      } catch (error) {
        console.error("Error fetching registered courses:", error);
        alert("Failed to fetch registered courses.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRegisteredCourses();
  }, []);

  const handleViewHandout = (handoutUrl) => {
    if (handoutUrl?.trim()) {
      setSelectedHandout(handoutUrl);
      setIsModalOpen(true);
    } else {
      alert("No handout available for this course.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Registered Courses and Sections
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : registeredCourses.length === 0 ? (
          <p className="text-center text-red-600">No Registered Courses Found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="py-2 px-4 border">#</th>
                  <th className="py-2 px-4 border">Course Name</th>
                  <th className="py-2 px-4 border">Course Code</th>
                  <th className="py-2 px-4 border">Section</th>
                  <th className="py-2 px-4 border">Faculty Name</th>
                  <th className="py-2 px-4 border">Handout</th>
                </tr>
              </thead>
              <tbody>
                {registeredCourses.map((mapping, index) => (
                  <tr key={mapping.id} className="hover:bg-gray-100 transition">
                    <td className="py-2 px-4 border text-center">{index + 1}</td>
                    <td className="py-2 px-4 border">{mapping.course.courseName}</td>
                    <td className="py-2 px-4 border">{mapping.course.courseCode}</td>
                    <td className="py-2 px-4 border">{mapping.section.sectionNo}</td>
                    <td className="py-2 px-4 border">{mapping.section.faculty.name}</td>
                    <td className="py-2 px-4 border text-center">
                      <button
                        onClick={() => handleViewHandout(mapping.course.handout)}
                      >
                        <EyeIcon className="w-6 h-6 text-blue-500 hover:text-blue-700 transition cursor-pointer" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Handout View */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-5xl relative">
            {/* Modal Header */}
            <div className="bg-red-600 text-white px-6 py-3 flex justify-between items-center rounded-t-lg">
              <h2 className="text-xl font-bold">View Handout</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:text-gray-200 text-lg font-bold"
              >
                &times;
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 relative">
              {/* Handout Viewer */}
              <iframe
                src={selectedHandout}
                width="100%"
                height="600px"
                title="Handout Viewer"
                className="border rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}