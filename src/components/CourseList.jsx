import React, { useState, useEffect } from "react";

import axios from 'axios';

const CourseList = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/courses');
            setCourses(res.data);
        } catch (error) {
            console.error("Error fetching the course", error);
        }
    };

    return (
        <div>
            <button onClick={fetchCourses}>List Courses</button>
            <table>
                <thead>
                    <tr>
                        <th>Course Title</th>
                        <th>Code</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course.id}>
                            <td>{course.title}</td>
                            <td>{course.code}</td>
                            <td>
                                <button>Search</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CourseList;