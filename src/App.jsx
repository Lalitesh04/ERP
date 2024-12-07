import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './admin/Home';
import Logout from './admin/Logout';
import AddStudent from './admin/AddStudent';
import ViewAllStudents from './admin/ViewAllStudents';
import AddFaculty from './admin/AddFaculty';
import ViewAllFaculty from './admin/ViewAllFaculty';
import AddCourse from './admin/AddCourse';
import ViewAllCourses from './admin/ViewAllCourses';
import ApproveLeave from './admin/ApproveLeave';
import CreateSection from './admin/CreateSection';
import ViewAllSections from './admin/ViewAllSections';
import FacultyCourseMapping from './admin/FacultyCourseMapping';
import ViewAllFacultyCourseMapping from './admin/ViewAllFacultyCourseMapping';
import StudentHome from './student/StudentHome';
import AcademicRegistration from './student/AcademicRegistration';
import StudentRegisteredCourses from './student/StudentRegistedCourses';
import StudentRegistrationCourses from './admin/StudentRegistrationCourses';
import FacultyHome from './faculty/FacultyHome';
import ViewHandout from './faculty/ViewHandout';
import CourseCoordinator from './faculty/CourseCoodinator';
import ApproveRegistration from './admin/ApproveRegistration';
import ApplyLeave from './faculty/ApplyLeave';
import ViewAllApplyLeaves from './faculty/ViewAllApplyLeaves';
import ViewAllLeaves from './admin/ViewAllLeaves';
import ViewFacultyCourses from './faculty/ViewFacultyCourses';
import UploadContent from './faculty/UploadContent';
import ViewAllContentCourses from './faculty/ViewAllContentCourses';
import ViewCourseContent from './student/ViewCourseContent';
import MainHome from './MainHome';
import NavBar from './NavBar';
import Team from './Team';
import Contact from './Contact';
import PayFee from './student/PayFee';
import ViewAllPayments from './student/ViewAllPayments';
import Profile from './faculty/Profile';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<><NavBar/> <Login /></>} />
          <Route path='/' element={<MainHome  />} />
          <Route path='/team' element={<><NavBar/> <Team/></> } />  
          <Route path='/contact' element={<><NavBar/> <Contact /></>} />
          <Route path='home' element={<Home />} />

          <Route path='admin/addstudent' element={<AddStudent />} />
          <Route path='admin/viewallstudent' element={<ViewAllStudents />} />
          <Route path='admin/studentregisteredcourses' element={<StudentRegistrationCourses />} />


          <Route path='admin/addfaculty' element={<AddFaculty />} />
          <Route path='admin/viewallfaculty' element={<ViewAllFaculty />} />



          <Route path='admin/addcourse' element={<AddCourse />} />
          <Route path='admin/viewallcourses' element={<ViewAllCourses />} />


          <Route path='admin/createsection' element={<CreateSection />} />
          <Route path='admin/viewallsections' element={<ViewAllSections />} />

          <Route path='admin/facultycoursemapping' element={<FacultyCourseMapping />} />
          <Route path='admin/viewfacultycoursemapping' element={<ViewAllFacultyCourseMapping />} />


          <Route path='admin/approveleave' element={<ApproveLeave />} />
          <Route path='/admin/viewallleaves' element={<ViewAllLeaves />} />


          <Route path='studenthome' element={<StudentHome />} />


          <Route path='academicregistration' element={<AcademicRegistration/>} />
          <Route path='studentregisteredcourses' element={<StudentRegisteredCourses />} />
          <Route path='approveRegistration' element={<ApproveRegistration />} />

          <Route path='/viewallfacultycourses' element={<ViewFacultyCourses />} />
          <Route path='/ViewAllContentCourses' element={<ViewAllContentCourses />} />


          <Route path='/uploadcontent' element={<UploadContent />} />

         <Route path='view' element={<ViewHandout />} />

          <Route path='facultyhome' element ={<FacultyHome/>}/>
          <Route path='applyleave' element={<ApplyLeave />} />
          <Route path='viewallapplyleaves' element={<ViewAllApplyLeaves />} />
          <Route path='coursecoodinator' element={<CourseCoordinator />} />

          <Route path='viewcoursemarerial' element={<ViewCourseContent />} />


          <Route path='payfee' element={<PayFee />} />
          <Route path='viewAllPayments' element={<ViewAllPayments />} />

          <Route path='facultyprofile' element={<Profile />} />
          <Route path='/logout' element={<Logout/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
