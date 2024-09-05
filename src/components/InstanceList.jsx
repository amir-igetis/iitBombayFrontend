import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InstanceList = () => {
    const [courseDeliveries, setCourseDeliveries] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState(null);
    const [year, setYear] = useState("");
    const [filteredDeliveries, setFilteredDeliveries] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [expandedRow, setExpandedRow] = useState(null);
    

    // fetching course deliveries
    useEffect(() => {
        const fetchCourseInstances = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/instances');
                setCourseDeliveries(response.data);

                // Extract unique semesters
                const uniqueSemesters = [...new Set(response.data.map(item => item.semester))];
                setSemesters(uniqueSemesters);
            } catch (error) {
                console.error("Error fetching the courses:", error);
            }
        };
        fetchCourseInstances();
    }, []);

    // semester selection
    const handleSemesterChange = (e) => {
        setSelectedSemester(parseInt(e.target.value));
    };

    // year selection
    const handleYearChange = (e) => {
        setYear(e.target.value);
    };

    // filtering  deliveries by year and semester
    const filterDeliveries = () => {
        if (year && selectedSemester) {
            const filtered = courseDeliveries.filter(
                (delivery) => delivery.year.toString() === year && delivery.semester === selectedSemester
            );
            setFilteredDeliveries(filtered);
        }
    };

    // viewing course details by year, semester and courseId
    const viewCourseDetails = async (year, semester, courseId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/instances/${year}/${semester}/${courseId}`);
            setSelectedCourse(response.data);
            setExpandedRow(courseId);
        } catch (error) {
            console.error("Error fetching course details:", error);
        }
    };

    // course details dropdown
    const toggleCourseDetails = (courseId) => {
        if (expandedRow === courseId) {
            setExpandedRow(null);
        } else {
            setExpandedRow(courseId);
        }
    };

    // course instance deletion
    const handleDeleteCourse = async (year, semester, courseId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this course instance?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/api/instances/${year}/${semester}/${courseId}`);
                // Update the state by filtering out the deleted course instance
                setFilteredDeliveries(filteredDeliveries.filter(delivery => delivery.course.id !== courseId));
                alert("Course instance deleted successfully.");
            } catch (error) {
                console.error("Error deleting course instance:", error);
            }
        }
    };

    return (
        <div className="max-w-screen-lg mx-auto my-6 p-6 border rounded-md shadow-md">
            {/* Input for Year and Dropdown for Semester Selection */}
            <div className="mb-4 flex items-center space-x-4">
                <input
                    className="border rounded-md px-4 py-2"
                    type="text"
                    placeholder="Year"
                    value={year}
                    onChange={handleYearChange}
                />
                <label>Select Semester:</label>
                <select
                    id="semester"
                    value={selectedSemester || ""}
                    onChange={handleSemesterChange}
                    className="px-4 py-2 border rounded-md"
                >
                    <option value="" disabled>Select a semester</option>
                    {semesters.map((semester) => (
                        <option key={semester} value={semester}>
                            Semester {semester}
                        </option>
                    ))}
                </select>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={filterDeliveries}
                >
                    List Instances
                </button>
            </div>

            {/* Display course deliveries */}
            {filteredDeliveries.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border rounded-lg shadow-md">
                        <thead>
                            <tr className="bg-blue-700 text-white border">
                                <th className="py-2 px-4 text-left">Course Title</th>
                                <th className="py-2 px-4 text-left">Year-Sem</th>
                                <th className="py-2 px-4 text-left">Code</th>
                                <th className="py-2 px-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDeliveries.map((delivery) => {
                                const isRowExpanded = expandedRow === delivery.id;

                                return (
                                    <React.Fragment key={delivery.id}>
                                        <tr className="bg-blue-100 border 
                                hover:bg-blue-200 
                                border-blue-900 border-b">
                                            <td className="border-r border-blue-800 py-2 px-4">{delivery.course.title}</td>
                                            <td className="border-r border-blue-800 py-2 px-4">{delivery.year}-{delivery.semester}</td>
                                            <td className="border-r border-blue-800 py-2 px-4">{delivery.course.code}</td>
                                            <td className="py-2 px-4 flex space-x-2">
                                                {/* Search Button */}
                                                <button
                                                    className="text-white bg-blue-500 px-3 py-1 rounded-md hover:bg-blue-700"
                                                    onClick={() => {
                                                        toggleCourseDetails(delivery.id);
                                                        viewCourseDetails(delivery.year, delivery.semester, delivery.course.id);
                                                    }}
                                                >
                                                    Search
                                                </button>
                                                {/* Delete Button */}
                                                <button
                                                    className="text-white bg-red-500 px-3 py-1 rounded-md hover:bg-red-700"
                                                    onClick={() => handleDeleteCourse(delivery.year, delivery.semester, delivery.course.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>

                                        {/* Dropdown for course details */}
                                        {isRowExpanded && selectedCourse && (
                                            <tr>
                                                <td colSpan="4" className="p-4 bg-gray-100">
                                                    <div className="space-y-2">
                                                        <p><strong>Course Title:</strong> {selectedCourse.course.title}</p>
                                                        <p><strong>Year:</strong> {selectedCourse.year}</p>
                                                        <p><strong>Semester:</strong> {selectedCourse.semester}</p>
                                                        <p><strong>Course Code:</strong> {selectedCourse.course.code}</p>
                                                        <p><strong>Description:</strong> {selectedCourse.course.description}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="mt-4 text-gray-700">
                    {year && selectedSemester ? "No course deliveries found for this year and semester." : "Please enter a year and select a semester."}
                </p>
            )}
        </div>
    );
};

export default InstanceList;

