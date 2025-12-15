// components/StudentList.tsx
import React from 'react';
import { Student } from '../types/student';
import StudentItem from './StudentItem'; // 单个学生项组件（原 Student 组件）

// 定义 Props 类型：接收学生数组
interface StudentListProps {
  students: Student[];
}

const StudentList: React.FC<StudentListProps> = ({ students }) => {
  // 循环渲染单个学生项
  return (
    <>
      {students.map((student) => (
        <StudentItem key={student._id} student={student} />
      ))}
    </>
  );
};

export default StudentList;
