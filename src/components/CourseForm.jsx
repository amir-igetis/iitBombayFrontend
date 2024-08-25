import React, { useState } from "react";

import axios from 'axios';

const CourseForm = ({ onCourseAdded }) => {
    const [title, setTitle] = useState('');
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (ex) => {
        ex.preventDefaultX();
        const course = { title, code, description };

        try {
            await axios.post('http://localhost:8080/api/courses', course);
            onCourseAdded();
        } catch (errot) {
            console.errot("Error adding the course", errot);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="" id="" placeholder="Course Title" value={title} onChange={
                (ex) => setTitle(ex.target.value)

            } required />

            <input type="text" name="" id="" placeholder="Course Code" value={code} onChange={
                (ex) => setCode(ex.target.value)
            } required />

            <input type="text" name="" id="" placeholder="Course Description" value={description} onChange={
                (ex) => setDescription(ex.target.value)
            } required />

            <button type="Submit">Add Course</button>
        </form>
    );
};

export default CourseForm;