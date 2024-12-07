import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Typography, List, ListItem, ListItemPrefix, Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { HomeIcon, UserIcon, LanguageIcon, BookOpenIcon, CalendarIcon, CurrencyRupeeIcon, PowerIcon, HomeModernIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Home from './StudentHome';
import { FaUniversity } from 'react-icons/fa';

export default function SideBar() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(null); // Start with null to indicate no accordion is open
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('student');
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
            Student Portal <span className="text-blue-500"></span>
          </Typography>
        </div>


        <List className="space-y-2">
        <Link to="/studenthome" className="text-gray-600 flex flex-r"> 
            <ListItem className="hover:bg-gray-100 rounded-md">
              <ListItemPrefix><HomeIcon className="h-5 w-5 text-gray-600" /></ListItemPrefix>
              <span className="ml-2">Home</span>
            </ListItem>
          </Link>       

           <Link to="/academicregistration" className="text-gray-600 flex flex-r"> 
            <ListItem className="hover:bg-gray-100 rounded-md">
              <ListItemPrefix><FaUniversity className="h-5 w-5 text-gray-600" /></ListItemPrefix>
              <span className="ml-2">Academic Registration</span>
            </ListItem>
          </Link>        

          <Accordion open={open === 3} icon={<ChevronDownIcon strokeWidth={2.5} className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""}`} />}>
            <ListItem className="p-0">
              <AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3 hover:bg-gray-100">
                <ListItemPrefix><BookOpenIcon className="h-5 w-5 text-blue-500" /></ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">Course</Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0 space-y-1">
                <Link to="/studentregisteredcourses"><ListItem className="text-gray-600 hover:text-blue-500"><ChevronRightIcon className="h-3 w-5 mr-2" />View All Courses</ListItem></Link>
                <Link to="/viewcoursemarerial"><ListItem className="text-gray-600 hover:text-blue-500"><ChevronRightIcon className="h-3 w-5 mr-2" />View Course Content</ListItem></Link> 
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
               <Link to="/payfee"> <ListItem className="text-gray-600 hover:text-blue-500"><ChevronRightIcon className="h-3 w-5 mr-2" />App Fee</ListItem></Link>
               <Link to="/viewallpayments"> <ListItem className="text-gray-600 hover:text-blue-500"><ChevronRightIcon className="h-3 w-5 mr-2" />View All Payments</ListItem></Link>
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
