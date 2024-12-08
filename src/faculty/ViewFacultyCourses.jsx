import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import APIS from "../admin/APIS"; // Replace with actual API paths

export default function ViewFacultyCourses() {
  const [facultyCourses, setFacultyCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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
        console.log(response.data);
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
