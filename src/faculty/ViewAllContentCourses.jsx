import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import APIS from "../admin/APIS"; // Replace with your actual API paths

export default function ViewFacultyCourses() {
  const [facultyCourses, setFacultyCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [courseContents, setCourseContents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState("");

  // Fetch courses assigned to the faculty
  useEffect(() => {
    const faculty = JSON.parse(localStorage.getItem("faculty")); // Assuming faculty data is stored in localStorage

    const fetchFacultyCourses = async () => {
      try {
        const response = await axios.get(
          `${APIS.VIEW_FACULTY_COURSES}?facultyId=${faculty.id}`,
          {
              headers: {
                  'api-key': '1234567890',
              },
          }
        );
        setFacultyCourses(response.data);
        setError("");
      } catch (err) {
        console.error("Error fetching faculty courses:", err);
        setError("Failed to fetch faculty courses.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFacultyCourses();
  }, []);

  // Open modal and fetch course contents for the selected section
  const handleViewMaterials = async (sectionId) => {
    setSelectedSectionId(sectionId);
    setIsModalOpen(true);
    setModalLoading(true);
    setCourseContents([]);
    setModalError("");

    console.log(sectionId);
    

    try {
      const response = await axios.get(
        `${APIS.VIEW_COURSE_CONTENTS}?sectionId=${sectionId}`,
        {
            headers: {
                'api-key': '1234567890',
            },
        }
      );
      setCourseContents(response.data);
    } catch (err) {
      console.error("Error fetching course contents:", err);
      setModalError("Failed to fetch course contents.");
    } finally {
      setModalLoading(false);
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSectionId(null);
    setCourseContents([]);
  };

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex-1 p-8 bg-white">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          View Faculty Courses
        </h1>

        {isLoading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : facultyCourses.length === 0 ? (
          <p className="text-center text-gray-600">No courses assigned.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="py-2 px-4 border">#</th>
                  <th className="py-2 px-4 border">Course Name</th>
                  <th className="py-2 px-4 border">Course Code</th>
                  <th className="py-2 px-4 border">Semester</th>
                  <th className="py-2 px-4 border">Section No</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {facultyCourses.map((course, index) => (
                  <tr key={course.id} className="hover:bg-gray-100 transition">
                    <td className="py-2 px-4 border text-center">{index + 1}</td>
                    <td className="py-2 px-4 border">{course.course.courseName}</td>
                    <td className="py-2 px-4 border">{course.course.courseCode}</td>
                    <td className="py-2 px-4 border">{course.course.semester}</td>
                    <td className="py-2 px-4 border text-center">{course.sectionNo}</td>
                    <td className="py-2 px-4 border text-center">
                      <button
                        onClick={() => handleViewMaterials(course.id )}
                        className="bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700"
                      >
                        View Materials
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-3/4">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Course Materials
            </h2>
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>

            {modalLoading ? (
              <p className="text-center text-gray-600">Loading...</p>
            ) : modalError ? (
              <p className="text-center text-red-600">{modalError}</p>
            ) : courseContents.length === 0 ? (
              <p className="text-center text-gray-600">No materials available.</p>
            ) : (
              <ul className="space-y-4">
                {courseContents.map((content) => (
                  <li key={content.id}>
                    <a
                      href={content.content}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      {content.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
