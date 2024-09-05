import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CourseList = () => {

    const [courses, setCourses] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [searchedCourse, setSearchedCourse] = useState(null);

    // if you want to show the table when we go to the root and you want to clear tha table then just use this part 

    // useEffect(() => {
    //     const fetchCourses = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:8080/api/courses");
    //             setCourses(response.data);
    //         } catch (error) {
    //             console.log("Error fetching courses !!", error);
    //             alert("Couldn't fetch courses");
    //         }
    //     };
    //     fetchCourses();
    // }, []);


    // this block of code when you want to generate the table after clicking the button 
    const fetchCourses = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/courses");
            setCourses(response.data);
        } catch (error) {
            console.log("Error fetching courses !!", error);
            alert("Couldn't fetch courses");
        }
    };


    const handleButtonOnClick = () => {
        setShowTable(true);
        fetchCourses();
    };
    // 

    // fetching the courses by id
    const handleSearch = (courseId) => {
        setSelectedCourseId(courseId);
        const fetchCourseById = async () => {

            try {
                const response = await axios.get(`http://localhost:8080/api/courses/${courseId}`);
                setSearchedCourse(response.data);
            } catch (error) {
                console.log("Error fetching course by ID !", error);
                alert("Couldn't fetch the course");
            }
        };
        fetchCourseById()
    };

    // DELETE OPERATION AHHHHHHHHHHHH LETS GO !!!!!!! 
    const handleDelete = (courseId) => {
        setSelectedCourseId(courseId);
        const confirmDelete = window.confirm("Are you sure you want to delete this course?")
        const deleteCoursesById = async () => {
            if (confirmDelete) {
                try {
                    await axios.delete(`http://localhost:8080/api/courses/${courseId}`);
                    setCourses(courses.filter((course) => courseId !== course.id));
                    alert("Course deleted successfully!!")
                } catch (error) {
                    console.log("Error deleting course : ", error);
                    alert("Error deleting the course");
                }
            }
        };
        deleteCoursesById();
    };


    return (
        <div className="max-w-screen-lg mx-auto my-6 p-6 border rounded-md shadow-md">
            {/* Button Container */}
            <div className="container mx-auto p-2 flex justify-center space-x-4">
                <button onClick={() => setCourses([])}
                    className="text-white my-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-md">
                    Clear Table
                </button>
                <button onClick={handleButtonOnClick}
                    className="text-white my-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-md">
                    List Table
                </button>
            </div>

            {/* Table */}
            {showTable && (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-blue-700 text-white border">
                                <th className="py-2 px-4 text-left">Course Title</th>
                                <th className="py-2 px-4 text-left">Course Code</th>
                                <th className="py-2 px-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course) => (
                                <>
                                    <tr key={course.id}
                                        className="bg-blue-100 border 
                                hover:bg-blue-200 
                                border-blue-900 border-b">
                                        <td className="border-r border-blue-800 py-2 px-4">{course.title}</td>
                                        <td className="border-r border-blue-800 py-2 px-4">{course.code}</td>
                                        <td className="py-2 px-4 flex space-x-2">
                                            <button onClick={() => handleSearch(course.id)}
                                                className="text-white bg-blue-500 px-3 py-1 rounded-md hover:bg-blue-700">Search</button>
                                            <button
                                                onClick={() => handleDelete(course.id)}
                                                className="text-white bg-red-500 px-3 py-1 rounded-md hover:bg-red-700">Delete</button>
                                        </td>
                                    </tr>
                                    {/* you can have a drop down row when you hit the search key in the action using below code  */}
                                    {searchedCourse?.id === course.id && (
                                        <tr key={`details-${course.id}`} className="bg-green-100">
                                            <td colSpan={3} className="py-4 px-4">
                                                <p><strong>Course ID :</strong> {searchedCourse.id}</p>
                                                <p><strong>Description :</strong> {searchedCourse.description}</p>
                                            </td>
                                        </tr>
                                    )}
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {/* you can generate the search operation below the table but then you'll have to delete jsx 
            enclosing tag and above the delete the row generation code or it will show error  */}
            {/* {searchedCourse && (
                <div className="mt-4 p-4 border rounded-md bg-green-100">
                    <h2 className="text-lg font-bold">Selected Course: </h2>
                    <p>Description : {searchedCourse.description}</p>
                </div>
            )} */}
        </div>
    );


};

export default CourseList;
