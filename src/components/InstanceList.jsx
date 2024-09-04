import React from 'react';

function CourseInstanceList({ instances, onViewInstance, onDeleteInstance }) {
    return (
        <div>
            <h2 className="text-xl font-bold mb-2">Course Instances</h2>
            <ul className="border p-2 mb-4">
                {instances.map((instance) => (
                    <li key={instance.id} className="flex justify-between items-center p-2 border-b">
                        <div>
                            <h3 className="font-bold">{instance.title}</h3>
                            <p>{instance.year}-{instance.semester}</p>
                        </div>
                        <div>
                            <button
                                onClick={() => onViewInstance(instance.year, instance.semester, instance.id)}
                                className="bg-gray-300 p-2 rounded mr-2"
                            >
                                View
                            </button>
                            <button
                                onClick={() => onDeleteInstance(instance.year, instance.semester, instance.id)}
                                className="bg-red-500 text-white p-2 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CourseInstanceList;
