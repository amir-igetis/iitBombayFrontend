import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InstanceForm = ({ onInstanceAdded }) => {
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');
    const [courseId, setCourseId] = useState('');
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/courses');
            setCourses(response.data);
        } catch (error) {
            console.error('There was an error fetching the courses', error);
        }
    };

    const handleSubmit = async (ex) => {
        ex.preventDefault();
        const courseDelivery = { year, semester, course: { id: courseId } };

        try {
            await axios.post('http://localhost:8080/api/instances', courseDelivery);
            onInstanceAdded();
        } catch (error) {
            console.error('Error adding the instance!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <select value={courseId} onChange={(ex) => setCourseId(ex.target.value)} required>
                <option value="" disabled>Select course</option>
                {courses.map((course) => (
                    <option key={course.id} value={course.id}>{course.title}</option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Year"
                value={year}
                onChange={(ex) => setYear(ex.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Semester"
                value={semester}
                onChange={(ex) => setSemester(ex.target.value)}
                required
            />
            <button type="submit">Add instance</button>
        </form>
    );
};

export default InstanceForm;