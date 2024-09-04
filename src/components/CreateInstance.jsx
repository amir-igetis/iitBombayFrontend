// import React, { useState } from 'react';
// import { createInstance } from '../api/instanceApi';

import { useEffect, useState } from "react";
// import { createInstance } from "../api/instanceApi";
import axios from "axios";


const CreateInstance = () => {


    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [year, setYear] = useState("");
    const [semester, setSemester] = useState("");

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/courses');
                setCourses(response.data);
            } catch (error) {
                console.error("Error fetching the courses : ", error);
            }
        };
        fetchCourses();
    }, []);

    // handle the course selection 
    const handleCourseChange = (e) => {
        setSelectedCourseId(parseInt(e.target.value));
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     axios.post("http://localhost:8080/api/instances", {})
    // };

    const handleYearChange = (e) => {
        setYear(e.target.value);
    };

    const handleSemesterChange = (e) => {
        setSemester(e.target.value);
    };

    const handleAddInstance = async (e) => {
        e.preventDefault();
        if (!selectedCourseId || !semester || !year) {
            alert('Please select a course and provide a year and semester');
            return;
        }

        const courseDelivery = {
            year: parseInt(year),
            semester: parseInt(semester),
            course: { id: selectedCourseId }
        };

        try {
            const response = await axios.post("http://localhost:8080/api/instances", courseDelivery);
            console.log("Course instance created successfully !!");
            alert("Course instance created successfully");
            setSelectedCourseId(null);
            setYear("");
            setSemester("");
        } catch (error) {
            console.log("Error creating course instance", error);
            alert("Error Creating the course")
        }
    };

    return (
        <div className="flex justify-center rounded-md">
            <form onSubmit={handleAddInstance}>
                <div className="max-w-sm max-auto p4 border rounded-md flex justify-center">
                    <select value={selectedCourseId}
                        onChange={handleCourseChange}
                        className="bg-blue-50 p-2 border rounded-md">
                        <option className="rounded-md" >Select Course</option>
                        {courses.map((course) => (
                            <option key={course.id} value={course.id}>{course.title}</option>
                        ))}
                    </select>
                </div >
                <div className="px-4 py-2">
                    <label className="block text-sm font-medium text-gray-700">Year</label>
                    <input type="number" placeholder='Year' value={year}
                        onChange={handleYearChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
                    />
                    <label className="block text-sm font-medium text-gray-700">semester</label>
                    <input type="number" placeholder='Semester' value={semester}
                        onChange={handleSemesterChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
                    />
                </div>
                <div className="px-4 py-2 flex justify-center">

                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        Add instance
                    </button>
                </div>
            </form>
        </div>
    );


};

export default CreateInstance;


