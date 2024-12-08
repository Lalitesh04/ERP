import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import APIS from "../admin/APIS";
import { EyeIcon, PencilIcon, XMarkIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";

export default function CourseCoordinator() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "upload" or "view"
  const [file, setFile] = useState(null);
  const faculty = JSON.parse(localStorage.getItem("faculty"));

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${APIS.VIEW_CC_COURSES}?facultyId=${faculty.id}`
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        alert("Failed to fetch courses.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [faculty.id]);

  // Handle file upload
  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle "Save" action in the modal
  const handleSave = async () => {
    if (!file || !selectedCourse) {
      alert("Please select a file and a valid course.");
      return;
    }

    const formData = new FormData();
    formData.append("courseId", selectedCourse.id);
    formData.append("file", file);

    try {
      const response = await axios.post(APIS.UPLOAD_HANDOUT, formData, {
        headers: { "Content-Type": "multipart/form-data" , 'api-key': '1234567890'},
      });
      alert(response.data || "Handout uploaded successfully!");
      setIsModalOpen(false);
      setFile(null);
      // Refetch courses to update the handout
      const updatedCourses = await axios.get(
        `${APIS.VIEW_CC_COURSES}?facultyId=${faculty.id}`
      );
      setCourses(updatedCourses.data);
    } catch (error) {
      console.error("Error uploading handout:", error);
      alert("Failed to upload handout.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          My Courses
        </h1>

        {isLoading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : courses.length === 0 ? (
          <p className="text-center text-red-600">No Courses Found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="py-2 px-4 border">#</th>
                  <th className="py-2 px-4 border">Course Code</th>
                  <th className="py-2 px-4 border">Course Name</th>
                  <th className="py-2 px-4 border">HandOut</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={course.id} className="hover:bg-gray-100 transition">
                    <td className="py-2 px-4 border text-center">{index + 1}</td>
                    <td className="py-2 px-4 border">{course.courseCode}</td>
                    <td className="py-2 px-4 border">{course.courseName}</td>
                    <td className="py-2 px-4 border text-center">
                      <div className="flex space-x-5 justify-center">
                        <button
                          onClick={() => {
                            setSelectedCourse(course);
                            setModalType("view");
                            setIsModalOpen(true);
                          }}
                        >
                          <EyeIcon className="h-6 w-6 text-blue-600 cursor-pointer" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedCourse(course);
                            setModalType("upload");
                            setIsModalOpen(true);
                          }}
                        >
                          <PencilIcon className="h-6 w-6 text-green-600 cursor-pointer" />
                        </button>
                      </div>
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
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4">
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
                {modalType === "view" ? "View Handout" : "Upload Handout"}
              </h2>
              <div className="flex items-center space-x-3">
                {modalType === "view" && selectedCourse?.handout && (
                  <a
                    href={selectedCourse.handout}
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
              {modalType === "view" && (
                <>
                  {selectedCourse?.handout?.trim() ? (
                    <iframe
                      src={`${selectedCourse.handout}#toolbar=0&zoom=fit`}
                      className="w-full h-full border rounded-lg"
                      title="Handout Viewer"
                    ></iframe>
                  ) : (
                    <p className="text-gray-600 text-center text-lg">
                      No Handout Available
                    </p>
                  )}
                </>
              )}

              {modalType === "upload" && (
                <div className="flex flex-col h-full">
                  <p className="text-gray-600 mb-4 text-center">
                    Upload a PDF handout for the course:{" "}
                    <span className="font-semibold text-blue-600">
                      {selectedCourse?.courseName}
                    </span>
                  </p>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="block w-full mb-4 border border-gray-300 rounded-md p-2"
                  />
                  <div className="flex justify-end space-x-4 mt-auto">
                    <button
                      onClick={() => {
                        setIsModalOpen(false);
                        setFile(null);
                      }}
                      className="bg-red-500 text-white px-6 py-2 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="bg-green-500 text-white px-6 py-2 rounded-md"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
