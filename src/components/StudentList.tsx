import React from 'react';
import { Student } from '../types/student';
import StudentItem from './StudentItem';

interface StudentListProps {
  students: Student[];
}

const StudentList: React.FC<StudentListProps> = ({ students }) => {
  return (
    <>
      {students.map((student) => (
        <StudentItem key={student._id} student={student} />
      ))}
    </>
  );
};

export default StudentList;
