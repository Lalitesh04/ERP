import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import APIS from "../admin/APIS"; // Adjust the import path to your API constants

export default function Profile() {
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Retrieve faculty details from localStorage
        const storedFaculty = JSON.parse(localStorage.getItem("faculty"));
        if (!storedFaculty || !storedFaculty.id) {
          throw new Error("Faculty details not found in local storage.");
        }

        // Fetch profile details from the API
        const response = await axios.get(
          `${APIS.VIEW_PROFILE_FACULTY}?facultyId=${storedFaculty.id}`
        );

        if (response.status === 200) {
          setFaculty(response.data);
        } else {
          throw new Error("Failed to fetch profile details.");
        }
      } catch (err) {
        console.error("Error fetching profile:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex">
        <SideBar />
        <div className="flex-1 bg-gray-100 min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-blue-600 text-lg">
            Loading profile...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex">
        <SideBar />
        <div className="flex-1 bg-gray-100 min-h-screen flex items-center justify-center">
          <p className="text-red-500 text-lg">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 bg-gray-100 min-h-screen flex items-center justify-center p-6">
        <div className="bg-white p-6 rounded-3xl shadow-xl max-w-3xl w-full transform transition-all hover:scale-105 hover:shadow-2xl duration-300">
          <div className="text-center mb-6">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-blue-600 shadow-md">
              {faculty?.image ? (
                <img
                  src={faculty.image}
                  alt="Faculty Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="bg-gray-300 flex items-center justify-center w-full h-full text-gray-700 text-sm">
                  No Image
                </div>
              )}
            </div>
            <h1 className="text-2xl font-bold text-blue-600 mt-4">
              {faculty?.name || "Faculty Profile"}
            </h1>
            <p className="text-gray-500">{faculty.department}</p>
          </div>

          <div className="space-y-4 fade-in">
            <ProfileField label="Email" value={faculty.email} />
            <ProfileField label="Phone" value={faculty.phone} />
            <ProfileField label="Address" value={faculty.address} />
            <ProfileField label="Gender" value={faculty.gender} />
            <ProfileField
              label="Birth Date"
              value={
                faculty.birthDate
                  ? new Date(faculty.birthDate).toLocaleDateString()
                  : "N/A"
              }
            />
            <ProfileField
              label="Account Created"
              value={
                faculty.createdAt
                  ? new Date(faculty.createdAt).toLocaleString()
                  : "N/A"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileField({ label, value }) {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg shadow-sm transition-transform transform hover:scale-105 duration-200">
      <span className="text-sm font-medium text-gray-600">{label}</span>
      <span className="text-sm text-gray-800 font-semibold">{value}</span>
    </div>
  );
}
