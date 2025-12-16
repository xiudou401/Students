import React, { useEffect } from 'react';
import { useFetch } from './hooks/useFetch';
import { HTTP_METHODS, Student } from './types/student';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import { StudentContext } from './store/studentContext';

const App = () => {
  const {
    data: students = [],
    isLoading,
    error,
    fetchData: fetchStudents,
  } = useFetch<Student[], void>({ url: 'students', method: HTTP_METHODS.GET });

  useEffect(() => {
    fetchStudents();
  }, []);

  console.log(students);
  return (
    <StudentContext.Provider value={{ fetchStudents }}>
      <div style={{ padding: '20px' }}>
        <h1>学生管理</h1>
        {error && <p style={{ color: 'red', margin: '10px 0' }}>{error}</p>}
        <table
          border={1}
          cellPadding={8}
          cellSpacing={0}
          style={{ width: '100%' }}
        >
          <thead>
            <tr>
              <th>姓名</th>
              <th>性别</th>
              <th>年龄</th>
              <th>地址</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <StudentForm />
            {isLoading && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center' }}>
                  Loading students...
                </td>
              </tr>
            )}
            {!isLoading && !error && <StudentList students={students ?? []} />}
            {!isLoading && !error && students.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center' }}>
                  暂无学生数据，点击上方添加～
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </StudentContext.Provider>
  );
};

export default App;
