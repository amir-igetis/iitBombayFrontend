import React, { useState } from 'react';
import CourseForm from './components/CourseForm';
import CourseList from './components/CourseList';
import InstanceForm from './components/InstanceForm';
import InstanceList from './components/InstanceList';
import Header from './components/Header';

const App = () => {
  const [refreshCourses, setRefreshCourses] = useState(false);
  const [refreshInstances, setRefreshInstances] = useState(false);

  const handleCourseAdded = () => {
    setRefreshCourses(!refreshCourses);
  };

  const handleInstanceAdded = () => {
    setRefreshInstances(!refreshInstances);
  };

  return (
    <div>
      <Header />
      <CourseForm onCourseAdded={handleCourseAdded} />
      <CourseList key={refreshCourses} />
      <InstanceForm onInstanceAdded={handleInstanceAdded} />
      <InstanceList key={refreshInstances} />
    </div>
  );
};

export default App;
