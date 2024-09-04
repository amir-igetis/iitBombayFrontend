import React, { useState } from 'react';
import axios from 'axios';

const CreateCourse = () => {
    const [title, setTitle] = useState('');
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/courses', { title, code, description })
            .then(() => {

                setTitle('');
                setCode('');
                setDescription('');
                alert("Successfully added the course !!")

            })
            // .catch(error => console.log('Error adding the course : ', error));
            .catch(error => {
                console.log("Error adding the course : ", error);
                alert("Failed to add a course");
            });
    };

    return (
        <div className=''>
            <div className='max-w-md mx-auto p-4 border rounded'>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Course Title</label>
                        <input type="text" placeholder='Course Title' value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Course Code</label>
                        <input type="text" placeholder='Course Code' value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Course Description</label>
                        <input type="text" placeholder='Course Description' value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm" />
                        {/* <textarea value={description} placeholder='Description' onChange={(e) => setDescription(e.target.value)} 
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"></textarea> */}
                    </div>
                    <div className='flex justify-center'>
                        <button type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Course</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default CreateCourse;



