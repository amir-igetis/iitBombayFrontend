import React, { useState, useEffect } from 'react';
import CreateCourse from './components/CreateCourse';
import AddCourseForm from './components/CreateCourse';
import CreateInstance from './components/CreateInstance';
import CourseList from './components/CourseList';
// import CourseForm from './components/CreateCourse';
// import CourseList from './components/CourseList';
// import CourseInstanceForm from './components/CreateInstance';
// import CourseInstanceList from './components/InstanceList';
// import { getAllCourses, deleteCourse } from './api/courseApi';
// import { getInstancesByYearAndSemester, deleteInstance } from './api/instanceApi';

function App() {
  return (
    <>
      {/* <CreateCourse />

      <CreateInstance /> */}

      <CourseList />

    </>);
};


// function App() {
//   const [courses, setCourses] = useState([]);
//   const [instances, setInstances] = useState([]);
//   const [selectedYear, setSelectedYear] = useState('');
//   const [selectedSemester, setSelectedSemester] = useState('');

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     try {
//       const response = await getAllCourses();
//       setCourses(response.data);
//     } catch (error) {
//       console.error('Failed to fetch courses:', error);
//     }
//   };

//   const addCourse = (course) => {
//     setCourses([...courses, course]);
//   };

//   const removeCourse = async (id) => {
//     try {
//       await deleteCourse(id);
//       setCourses(courses.filter(course => course.id !== id));
//     } catch (error) {
//       console.error('Failed to delete course:', error);
//     }
//   };

//   const fetchInstances = async (year, semester) => {
//     try {
//       const response = await getInstancesByYearAndSemester(year, semester);
//       setInstances(response.data);
//     } catch (error) {
//       console.error('Failed to fetch instances:', error);
//     }
//   };

//   const addInstance = (instance) => {
//     setInstances([...instances, instance]);
//   };

//   const removeInstance = async (year, semester, id) => {
//     try {
//       await deleteInstance(year, semester, id);
//       setInstances(instances.filter(instance => instance.id !== id));
//     } catch (error) {
//       console.error('Failed to delete instance:', error);
//     }
//   };

//   const handleYearAndSemesterChange = (year, semester) => {
//     setSelectedYear(year);
//     setSelectedSemester(semester);
//     fetchInstances(year, semester);
//   };

//   return (
//     <div className="app">
//       <h1>Course Management</h1>
//       <CourseForm addCourse={addCourse} />
//       <CourseList courses={courses} removeCourse={removeCourse} />

//       <h2>Course Instances</h2>
//       <CourseInstanceForm
//         selectedYear={selectedYear}
//         selectedSemester={selectedSemester}
//         addInstance={addInstance}
//       />
//       <CourseInstanceList
//         instances={instances}
//         removeInstance={removeInstance}
//         onYearAndSemesterChange={handleYearAndSemesterChange}
//       />
//     </div>
//   );
// }

export default App;
