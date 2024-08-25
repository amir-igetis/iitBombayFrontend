import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InstanceList = () => {
    const [instances, setInstances] = useState([]);
    const [semester, setSemester] = useState('');

    const fetchInstances = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/instances');
            setInstances(response.data);
        } catch (error) {
            console.error('Error fetching the instances', error);
        }
    };

    const handleSemesterChange = (ex) => {
        setSemester(ex.target.value);
    };

    useEffect(() => {
        fetchInstances();
    }, []);

    return (
        <div>
            <input
                type="text"
                placeholder="Year"
                onChange={(ex) => setSemester(ex.target.value)}
            />
            <select onChange={handleSemesterChange} required>
                <option value="">Select semester</option>
                {/* Add semester options here */}
            </select>
            <button onClick={fetchInstances}>List instances</button>
            <table>
                <thead>
                    <tr>
                        <th>Course Title</th>
                        <th>Year-Sem</th>
                        <th>Code</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {instances.map((instance) => (
                        <tr key={instance.id}>
                            <td>{instance.course.title}</td>
                            <td>{instance.year}-{instance.semester}</td>
                            <td>{instance.course.code}</td>
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

export default InstanceList;
