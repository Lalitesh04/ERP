import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import APIS from "../admin/APIS";
import Loader from "../Loader";

export default function AcademicRegistration() {
  const [coursesWithSections, setCoursesWithSections] = useState([]);
  const [selectedSections, setSelectedSections] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // For loader during submission

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("student"));

        if (!user) {
          setMessage("Unable to find student information. Please log in.");
          return;
        }

        const studentResponse = await axios.get(
          `${APIS.VIEW_STUDENT_bY_ID}?studentId=${user.studentId}`
        );
        const student = studentResponse.data;

        if (student.registered) {
          setMessage("Registration Already completed");
          return;
        }
        if (!student.approved) {
          setMessage("Your fee payments need to be approved by your mentor.");
          return;
        }

        const response = await axios.get(`${APIS.VIEW_ALL_SECTIONS}`);
        const sections = response.data;

        const groupedByCourse = sections.reduce((acc, section) => {
          const courseId = section.course.id;
          if (!acc[courseId]) {
            acc[courseId] = {
              courseId,
              courseName: section.course.courseName,
              courseCode: section.course.courseCode,
              sections: [],
            };
          }
          acc[courseId].sections.push({
            sectionId: section.id,
            sectionNo: section.sectionNo,
            capacity: section.capacity,
            name: section.faculty.name,
          });
          return acc;
        }, {});

        setCoursesWithSections(Object.values(groupedByCourse));
      } catch (error) {
        console.error("Error fetching sections:", error);
        setMessage("Failed to fetch courses and sections. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSections();
  }, []);

  const handleSectionChange = (courseId, sectionId) => {
    setSelectedSections((prev) => ({
      ...prev,
      [courseId]: sectionId,
    }));
  };

  const handleConfirm = () => {
    if (
      Object.keys(selectedSections).length !== coursesWithSections.length ||
      Object.values(selectedSections).includes("")
    ) {
      setMessage("Please select a section for all listed courses.");
      return;
    }

    setShowConfirmation(true);
  };

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("student"));

    if (!user) {
      alert("Student ID is not found in local storage.");
      return;
    }

    setIsSubmitting(true);

    const studentId = user.studentId;
    const selectedCourseIds = Object.keys(selectedSections).map(Number);
    const selectedSectionIds = Object.values(selectedSections).map(Number);

    const requestData = {
      studentId,
      courseId: selectedCourseIds,
      sectionId: selectedSectionIds,
    };

    try {
      await axios.post(`${APIS.STUDENT_REGISTER}`, requestData);
      alert("Registration successful!");
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Failed to register. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar />
      <div className="flex-1 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Academic Registration
        </h1>

        {message ? (
          <div className="text-red-600 text-center font-bold mb-4">{message}</div>
        ) : isLoading ? (
          <Loader/>
        ) : coursesWithSections.length === 0 ? (
          <p className="text-center text-red-600">No Courses or Sections Found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="py-2 px-4 border">#</th>
                  <th className="py-2 px-4 border">Course Name</th>
                  <th className="py-2 px-4 border">Course Code</th>
                  <th className="py-2 px-4 border">Select Section</th>
                </tr>
              </thead>
              <tbody>
                {coursesWithSections.map((course, index) => (
                  <tr
                    key={course.courseId}
                    className="hover:bg-gray-100 transition"
                  >
                    <td className="py-2 px-4 border text-center">{index + 1}</td>
                    <td className="py-2 px-4 border">{course.courseName}</td>
                    <td className="py-2 px-4 border">{course.courseCode}</td>
                    <td className="py-2 px-4 border">
                      <select
                        value={selectedSections[course.courseId] || ""}
                        onChange={(e) =>
                          handleSectionChange(course.courseId, e.target.value)
                        }
                        className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        <option value="" disabled>
                          Select Section
                        </option>
                        {course.sections.map((section) => (
                          <option
                            key={section.sectionId}
                            value={section.sectionId}
                          >
                            {section.sectionNo} - {section.name}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-center mt-6">
              <button
                onClick={handleConfirm}
                className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition"
              >
                Review and Confirm
              </button>
            </div>
          </div>
        )}
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-3/4">
            <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
              Confirm Registration
            </h2>
            <table className="min-w-full border border-gray-300 mb-4">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="py-2 px-4 border">Course Name</th>
                  <th className="py-2 px-4 border">Section</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(selectedSections).map(([courseId, sectionId]) => {
                  const course = coursesWithSections.find(
                    (c) => c.courseId === parseInt(courseId)
                  );
                  const section = course.sections.find(
                    (s) => s.sectionId === parseInt(sectionId)
                  );

                  return (
                    <tr key={courseId}>
                      <td className="py-2 px-4 border">{course.courseName}</td>
                      <td className="py-2 px-4 border">
                        {section.sectionNo} - {section.name}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="flex justify-center space-x-4">
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition"
              >
                {isSubmitting ? "Submitting..." : "Confirm and Submit"}
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}