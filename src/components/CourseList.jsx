import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CourseList = () => {

    const [courses, setCourses] = useState([]);
    const [showTable, setShowTable] = useState(false);

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

    return (
        <div>
            {/* <button onClick={() => setCourses([])}>Clear Table</button> */}
            <button onClick={() => setCourses([])}>clear Table</button>
            <button onClick={handleButtonOnClick}>List Table</button>

            <table>
                <thead>
                    <tr>
                        <th>Course Description</th>
                        <th>Course Code</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course.id}>
                            <td>{course.description}</td>
                            <td>{course.code}</td>
                            <td>
                                <button >Search</button>
                                <button >Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )


};

export default CourseList;
