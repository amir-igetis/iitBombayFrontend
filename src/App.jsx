import React, { useState, useEffect } from 'react';
import CreateCourse from './components/CreateCourse';
import CreateInstance from './components/CreateInstance';
import CourseList from './components/CourseList';
import InstanceList from './components/InstanceList';


function App() {

  const [page, setPages] = useState(<CreateCourse />)

  const changePage = (components) => {
    setPages(components);
  }


  return (
    <>
      {/* pre built code for bg color changer @copyright Amirul  */}
      <div className="w-full h-screen duration-200"
      >
        {page}

        <div className="fixed flex flex-wrap
        justify-center bottom-12 inset-x-0 px-2">
          <div className="flex flex-wrap 
          justify-center gap-3 shadow-lg bg-blue-100 px-3 py-2 
          rounded-lg">
            <button
              onClick={() => changePage(<CreateCourse />)}
              className="px-4 py-2 bg-blue-500 hover:focus:marker: rounded-md text-white shadow-lg "
            >Create Course</button>
            <button
              onClick={() => changePage(<CreateInstance />)}
              className="px-4 py-2 bg-blue-500 hover:focus:marker: rounded-md text-white shadow-lg"
            >CreateInstance</button>
            <button
              onClick={() => changePage(<CourseList />)}
              className="px-4 py-2 bg-blue-500 hover:focus:marker: rounded-md text-white shadow-lg"
            >CourseList</button>
            <button
              onClick={() => changePage(<InstanceList />)}
              className="px-4 py-2 bg-blue-500 hover:focus:marker: rounded-md text-white shadow-lg"
            >InstanceList</button>
          </div>
        </div>
      </div>

    </>);
};


export default App;

