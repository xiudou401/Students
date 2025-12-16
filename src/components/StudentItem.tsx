import React, { useState } from 'react';
import { HTTP_METHODS, Student } from '../types/student';
import StudentForm from './StudentForm';
import { useFetch } from '../hooks/useFetch';

interface StudentItemProps {
  student: Student;
}

const StudentItem: React.FC<StudentItemProps> = ({ student }) => {
  const {
    data,
    error,
    isLoading,
    fetchData: deleteStudents,
  } = useFetch({
    url: `students/${student._id}`,
    method: HTTP_METHODS.DELETE,
  });
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing && <StudentForm />}
      {!isEditing && (
        <>
          {!isLoading && !error && (
            <tr>
              <td>{student.name}</td>
              <td>{student.gender}</td>
              <td>{student.age}</td>
              <td>{student.address}</td>
              <td>
                <button>edit</button>
                <button>delete</button>
              </td>
            </tr>
          )}
          {isLoading && (
            <tr>
              <td colSpan={5}>Loading</td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan={5}>{error}</td>
            </tr>
          )}
        </>
      )}
    </>
  );
};

export default StudentItem;
