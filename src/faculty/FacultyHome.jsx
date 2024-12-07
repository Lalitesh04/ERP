import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'

export default function FacultyHome() {

  const [user,setUser] = useState();

  useEffect(() => {
    const faculty  = JSON.parse(localStorage.getItem('faculty'))
    console.log(faculty);
    
    if(!faculty) {
      return navigate('/login')
    }
    setUser(faculty)
  }, []);

  return (
    <div className='flex min-h-screen'>
        <SideBar/>

            {/* Main Content */}
    <div className="flex-1 bg-gray-50 p-6">
      {/* Welcome Section */}
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-4xl font-semibold text-blue-600 mb-4">
          Welcome, {user ? user.name : 'Guest'}!
        </h1>
        {/* Placeholder for additional content */}
        <div className="mt-8 bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700">Dashboard Overview</h2>
          <p className="text-gray-500 mt-2">Here's an overview of your account and activities.</p>
        </div>
      </div>
    </div>
    </div>
  )
}
