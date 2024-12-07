import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import APIS from "../admin/APIS"; // Replace with your actual API paths

export default function ViewCourseContent() {
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [courseContents, setCourseContents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState("");
  const [selectedCourseName, setSelectedCourseName] = useState("");

  useEffect(() => {
    const fetchRegisteredCourses = async () => {
      const student = JSON.parse(localStorage.getItem("student"));

      if (!student) {
        alert("Student data is not found in local storage.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${APIS.VIEW_ALL_REGISTERED_COURSES_BY_STUDENT}?studentId=${student.studentId}`
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

  const handleViewMaterials = async (sectionId, courseName) => {
    setSelectedCourseName(courseName);
    setIsModalOpen(true);
    setModalLoading(true);
    setCourseContents([]);
    setModalError("");

    try {
      const response = await axios.get(
        `${APIS.VIEW_COURSE_CONTENTS}?sectionId=${sectionId}`
      );
      setCourseContents(response.data);
    } catch (err) {
      console.error("Error fetching course contents:", err);
      setModalError("Failed to fetch course contents.");
    } finally {
      setModalLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourseName("");
    setCourseContents([]);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          View Course Material
        </h1>

        {isLoading ? (
          <p className="text-center text-gray-600">Loading...</p>
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
                  <th className="py-2 px-4 border">Material</th>
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
                        onClick={() =>
                          handleViewMaterials(
                            mapping.section.id,
                            mapping.course.courseName
                          )
                        }
                        className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 transition"
                      >
                        View Material
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Course Materials */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-4xl">
            {/* Modal Header */}
            <div className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center rounded-t-lg">
              <h2 className="text-xl font-bold">
                Materials for {selectedCourseName}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-white hover:text-gray-200 text-lg font-bold"
              >
                &times;
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {modalLoading ? (
                <p className="text-center text-gray-600">Loading materials...</p>
              ) : modalError ? (
                <p className="text-center text-red-600">{modalError}</p>
              ) : courseContents.length === 0 ? (
                <p className="text-center text-gray-600">No materials available.</p>
              ) : (
                <ul className="space-y-4">
                  {courseContents.map((content, index) => (
                    <li key={index} className="border-b pb-2">
                      <a
                        href={content.content}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {content.title || `Material ${index + 1}`}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
