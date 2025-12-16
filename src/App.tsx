import React from 'react';
import { useFetch } from './hooks/useFetch';
import { HTTP_METHODS, Student } from './types/student';

const App = () => {
  const {
    data: students,
    isLoading,
    error,
    fetchData: fetchStudents,
  } = useFetch<Student[], null>({ method: HTTP_METHODS.GET, url: 'students' });

  console.log(students);
  return <div></div>;
};

export default App;
