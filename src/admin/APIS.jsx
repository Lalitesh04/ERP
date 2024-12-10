const baseURL = "https://erproject.onrender.com/api"; 
const APIS = {
    LOGIN: `${baseURL}/checkLogin`,
    ADD_STUDENT : `${baseURL}/admin/addstudent`,
    VIEW_ALL_STUDENTS : `${baseURL}/admin/viewAllStudents`,

    ADD_FACULTY : `${baseURL}/admin/addFaculty`,
    VIEW_ALL_FACULTY : `${baseURL}/admin/viewAllFaculty`,


    ADD_COURSE : `${baseURL}/admin/addCourse`,
    VIEW_ALL_COURSES : `${baseURL}/admin/viewAllCourses`,

    CREATE_SECTION: `${baseURL}/admin/courseSectionMapping`,
    VIEW_ALL_SECTIONS : `${baseURL}/admin/viewAllSection`,
    VIEW_ALL_REGISTERED_COURSES : `${baseURL}/admin/studentRegisteredCourses`,

    ADD_COURSE_FACULTY_MAPPING : `${baseURL}/admin/addCourseFacultyMapping`,
    VIEW_ALL_COURSE_FACULTY_MAPPING : `${baseURL}/admin/viewAllCourseFacultyMapping`,
    
    STUDENT_REGISTER : `${baseURL}/student/studentRegister`,
    VIEW_ALL_REGISTERED_COURSES_BY_STUDENT : `${baseURL}/student/viewAllRegisteredCourses`,
    APPROVE_STUDENT_REGISTRATION: `${baseURL}/admin/approveStudentRegistration`,

    VIEW_ALL_LEAVES : `${baseURL}/admin/viewAllFacultyLeave`,
    UPDATE_LEAVE_STATUS : `${baseURL}/admin/viewFacultyLeaveUpdateStatus`,

    VIEW_STUDENT_bY_ID : `${baseURL}/student/viewStudentById`,
    VIEW_CC_COURSES :`${baseURL}/faculty/ccCourses`,
    UPLOAD_HANDOUT : `${baseURL}/faculty/uploadHandout`,
    VIEW_FACULTY_COURSES : `${baseURL}/faculty/viewSectionByFaculty`,

    VIEW_COURSE_CONTENTS : `${baseURL}/faculty/viewCourseContentBySection`,


    UPLOAD_CONTENT : `${baseURL}/faculty/uploadContent`,
    VIEW_ALL_SECTIONS_BY_FACULTY : `${baseURL}/faculty/viewSectionByFaculty`,
    APPLY_LEAVE :`${baseURL}/faculty/applyLeave`,


    VIEW_ALL_APPLY_LEAVES : `${baseURL}/faculty/viewLeavesByFaculty`,

    PAY_FEE : `${baseURL}/student/payFee`,
    VIEW_ALL_PAYMENTS : `${baseURL}/student/viewAllPayments`,

    VIEW_PROFILE_FACULTY : `${baseURL}/faculty/viewProfile`,

    VIEW_ALL_FEE_PAYMENTS : `${baseURL}/admin/viewAllFeePayments`,

    SWAGGER_UI : `http://10.128.0.79:2001/swagger-ui/index.html`
};

export default APIS;
