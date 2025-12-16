import React, { useContext, useState } from 'react';
import { HTTP_METHODS, Student } from '../types/student';
import StudentForm from './StudentForm';
import { useFetch } from '../hooks/useFetch';
import { StudentContext } from '../store/studentContext';

interface StudentItemProps {
  student: Student;
}

const StudentItem: React.FC<StudentItemProps> = ({ student }) => {
  const { fetchStudents } = useContext(StudentContext);
  const {
    error,
    isLoading,
    fetchData: deleteStudent,
  } = useFetch<void, void>(
    {
      url: `students/${student._id}`,
      method: HTTP_METHODS.DELETE,
    },
    fetchStudents
  );
  const [isEditing, setIsEditing] = useState(false);

  const onDelete = () => {
    deleteStudent();
  };

  const onEdit = () => {
    setIsEditing(true);
  };

  const notEdit = () => {
    setIsEditing(false);
  };
  return (
    <>
      {isEditing && <StudentForm student={student} notEdit={notEdit} />}
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
                <button onClick={onDelete}>delete</button>
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
