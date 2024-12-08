import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Typography, List, ListItem, ListItemPrefix, Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { HomeIcon, UserIcon, LanguageIcon, BookOpenIcon, CalendarIcon, CurrencyRupeeIcon, PowerIcon, HomeModernIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Home from './Home';
import { FcApproval } from 'react-icons/fc';

export default function SideBar() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(null); // Start with null to indicate no accordion is open
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('admin');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
      }
    } else {
      navigate('/'); // Redirect to login if no user is found
    }
  }, [navigate]);

  const handleOpen = (value) => {
    setOpen(open === value ? null : value); // Toggle the accordion open state
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl bg-white rounded-lg">
        <div className="mb-4 flex items-center space-x-3 p-4">
          <img src={user?.image || 'https://via.placeholder.com/150'} alt="Admin Image" className="h-16 w-22 rounded-full object-cover" />
          <Typography variant="h5" color="blue-gray" className="font-semibold">
            Admin Portal <span className="text-blue-500"></span>
          </Typography>
        </div>


        <List className="space-y-2">
        <Link to="/home" className="text-gray-600 flex flex-r"> 
            <ListItem className="hover:bg-gray-100 rounded-md">
              <ListItemPrefix><HomeIcon className="h-5 w-5 text-gray-600" /></ListItemPrefix>
              <span className="ml-2">Home</span>
            </ListItem>
          </Link>     

          <Link to="/approveRegistration" className="text-gray-600 flex flex-r"> 
            <ListItem className="hover:bg-gray-100 rounded-md">
              <ListItemPrefix><FcApproval className="h-5 w-5 text-gray-600" /></ListItemPrefix>
              <span className="ml-2">Approve Student Registration</span>
            </ListItem>
          </Link>        
          {/* Student Accordion */}
          <Accordion open={open === 1} icon={<ChevronDownIcon strokeWidth={2.5} className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`} />}>
            <ListItem className="p-0">
              <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3 hover:bg-gray-100">
                <ListItemPrefix><UserIcon className="h-5 w-5 text-blue-500" /></ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">Student</Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0 space-y-1">
                <Link to="/admin/addstudent" ><ListItem className="text-gray-600 hover:text-blue-500"><ChevronRightIcon className="h-3 w-5 mr-2" />Add Student</ListItem></Link>
                <Link to="/admin/viewallstudent"> <ListItem className="text-gray-600 hover:text-blue-500"><ChevronRightIcon className="h-3 w-5 mr-2" />View All Students</ListItem></Link>
                <Link to="/admin/studentregisteredcourses"> <ListItem className="text-gray-600 hover:text-blue-500"><ChevronRightIcon className="h-3 w-5 mr-2" />Student Registered Courses</ListItem></Link>
              </List>
            </AccordionBody>
          </Accordion>

          {/* Faculty Accordion */}
          <Accordion open={open === 2} icon={<ChevronDownIcon strokeWidth={2.5} className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`} />}>
            <ListItem className="p-0">
              <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3 hover:bg-gray-100">
                <ListItemPrefix><LanguageIcon className="h-5 w-5 text-blue-500" /></ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">Faculty</Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0 space-y-1">
                <Link to="/admin/addfaculty"><ListItem className="text-gray-600 hover:text-blue-500"><ChevronRightIcon className="h-3 w-5 mr-2" />Add Faculty</ListItem></Link>
                <Link to="/admin/viewallfaculty"> <ListItem className="text-gray-600 hover:text-blue-500"><ChevronRightIcon className="h-3 w-5 mr-2" />View All Faculty</ListItem></Link>
                <ListItem className="text-gray-600 hover:text-blue-500"><ChevronRightIcon className="h-3 w-5 mr-2" />View Faculty by ID</ListItem>
              </List>
            </AccordionBody>
          </Accordion>

          {/* Course Accordion */}
          <Accordion open={open === 3} icon={<ChevronDownIcon strokeWidth={2.5} className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""}`} />}>
            <ListItem className="p-0">
              <AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3 hover:bg-gray-100">
                <ListItemPrefix><BookOpenIcon className="h-5 w-5 text-blue-500" /></ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">Course</Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0 space-y-1">
                <Link to="/admin/addcourse"><ListItem className="text-gray-600 hover:text-blue-500"><ChevronRightIcon className="h-3 w-5 mr-2" />Add Course</ListItem></Link>
                <Link to="/admin/viewallcourses"><ListItem className="text-gray-600 hover:text-blue-500"><ChevronRightIcon className="h-3 w-5 mr-2" />View All Courses</ListItem></Link>

                <Link to="/admin/facultycoursemapping"><ListItem className="text-gray-600 hover:text-blue-500"><ChevronRightIcon className="h-3 w-5 mr-2" />Faculty Course Mapping</ListItem></Link>
                <Link to="/admin/viewfacultycoursemapping"><ListItem className="text-gray-600 hover:text-blue-500"><ChevronRightIcon className="h-3 w-5 mr-2" />View Faculty Course Mapping</ListItem></Link>

                <Link to="/admin/createsection"><ListItem className="text-gray-600 hover:text-blue-500"><ChevronRightIcon className="h-3 w-5 mr-2" />Section Mapping</ListItem></Link>
                <Link to="/admin/viewallsections"><ListItem className="text-gray-600 hover:text-blue-500"><ChevronRightIcon className="h-3 w-5 mr-2" />View All Section</ListItem></Link>

              </List>
            </AccordionBody>
          </Accordion>

          {/* Leave Management Accordion */}
          <Accordion open={open === 4} icon={<ChevronDownIcon strokeWidth={2.5} className={`mx-auto h-4 w-4 transition-transform ${open === 4 ? "rotate-180" : ""}`} />}>
            <ListItem className="p-0">
              <AccordionHeader onClick={() => handleOpen(4)} className="border-b-0 p-3 hover:bg-gray-100">
                <ListItemPrefix><CalendarIcon className="h-5 w-5 text-blue-500" /></ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">Leave Management</Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0 space-y-1">
                <Link to="/admin/approveleave" > <ListItem className="text-gray-600 hover:text-blue-500"><ChevronRightIcon className="h-3 w-5 mr-2" />Approve Leave</ListItem></Link>
                <Link to="/admin/viewallleaves"> <ListItem className="text-gray-600 hover:text-blue-500"><ChevronRightIcon className="h-3 w-5 mr-2" />View All Leaves</ListItem></Link>
                <ListItem className="text-gray-600 hover:text-blue-500"><ChevronRightIcon className="h-3 w-5 mr-2" />View Leaves By Faculty</ListItem>
              </List>
            </AccordionBody>
          </Accordion>

          {/* Fee Payments Accordion */}
          <Accordion open={open === 5} icon={<ChevronDownIcon strokeWidth={2.5} className={`mx-auto h-4 w-4 transition-transform ${open === 5 ? "rotate-180" : ""}`} />}>
            <ListItem className="p-0">
              <AccordionHeader onClick={() => handleOpen(5)} className="border-b-0 p-3 hover:bg-gray-100">
                <ListItemPrefix><CurrencyRupeeIcon className="h-5 w-5 text-blue-500" /></ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">Fee Payments</Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0 space-y-1">
               <Link to="/viewallfeepayments"> <ListItem className="text-gray-600 hover:text-blue-500"><ChevronRightIcon className="h-3 w-5 mr-2" />View All Payment</ListItem></Link>
                {/* <ListItem className="text-gray-600 hover:text-blue-500"><ChevronRightIcon className="h-3 w-5 mr-2" />View All Payments</ListItem>
                <ListItem className="text-gray-600 hover:text-blue-500"><ChevronRightIcon className="h-3 w-5 mr-2" />View Payments By Faculty</ListItem> */}
              </List>
            </AccordionBody>
          </Accordion>

          <Link to="/logout" className="text-gray-600 flex flex-r"> 
            <ListItem className="hover:bg-gray-100 rounded-md">
              <ListItemPrefix><PowerIcon className="h-5 w-5 text-gray-600" /></ListItemPrefix>
              <span className="ml-2">LogOut</span>
            </ListItem>
          </Link>
        </List>
      </Card>
    </div>
  );
}
