import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import APIS from "./APIS";

export default function ViewAllFaculty() {
  const [faculty, setFaculty] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch all faculty
  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await axios.get(APIS.VIEW_ALL_FACULTY);
       
        setFaculty(response.data);
      } catch (error) {
        console.error("Error fetching faculty:", error);
        alert("Failed to fetch faculty.");
      }
    };
    fetchFaculty();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">View All Faculty</h1>

        {/* Faculty Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Phone</th>
                <th className="py-2 px-4 border">Address</th>
                <th className="py-2 px-4 border">Gender</th>
                <th className="py-2 px-4 border">Birth Date</th>
                <th className="py-2 px-4 border">Department</th>
                <th className="py-2 px-4 border">Image</th>
              </tr>
            </thead>
            <tbody>
              {faculty.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-gray-100 transition"
                >
                  <td className="py-2 px-4 border text-center">{member.id}</td>
                  <td className="py-2 px-4 border">{member.name}</td>
                  <td className="py-2 px-4 border">{member.email}</td>
                  <td className="py-2 px-4 border">{member.phone}</td>
                  <td className="py-2 px-4 border">{member.address}</td>
                  <td className="py-2 px-4 border text-center">{member.gender}</td>
                  <td className="py-2 px-4 border text-center">{new Date(member.birthDate).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border text-center">{member.department}</td>
                  <td className="py-2 px-4 border text-center">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt="Faculty"
                        className="h-12 w-12 rounded-full object-cover cursor-pointer"
                        onClick={() => setSelectedImage(member.image)}

                      />
                      
                    ) : (
                      "No Image"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={selectedImage}
                alt="Selected"
                className="max-w-full max-h-screen"
              />
              <button
                className="absolute top-4 right-4 bg-red-500 text-white rounded-full px-4 py-2 font-semibold"
                onClick={() => setSelectedImage(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
