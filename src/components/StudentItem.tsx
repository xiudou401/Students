import React, { MouseEvent, useContext, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { StudentContext } from '../store/studentContext';
import StudentForm from './StudentForm';
import { Student } from '../types/student';

interface StudentProps {
  student: Student;
}

const StudentItem: React.FC<StudentProps> = ({ student }) => {
  const { fetchStudents } = useContext(StudentContext);
  const {
    error,
    isLoading,
    fetchData: deleteStudent,
  } = useFetch(
    { url: `students/${student._id}`, method: 'delete' },
    fetchStudents
  );

  const [isEditing, setIsEditing] = useState(false);

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    deleteStudent();
  };

  const onEdit = () => {
    setIsEditing(true);
  };

  const NotEdit = () => {
    setIsEditing(false);
  };
  return (
    <>
      {isEditing && <StudentForm student={student} onCancelEdit={NotEdit} />}
      {!isEditing && (
        <>
          {!isLoading && !error && (
            <tr>
              <td>{student.name}</td>
              <td>{student.gender}</td>
              <td>{student.age}</td>
              <td>{student.address}</td>
              <td>
                <button onClick={onEdit}>edit</button>
                <button onClick={handleClick}>delete</button>
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
