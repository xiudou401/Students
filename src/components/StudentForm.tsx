import React, { ChangeEvent, MouseEvent, useContext, useState } from 'react';
import { HTTP_METHODS, Student } from '../types/student';
import { useFetch } from '../hooks/useFetch';
import { StudentContext } from '../store/studentContext';

interface StudentFormProps {
  student?: Student;
  notEdit?: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ student, notEdit }) => {
  const [newStudent, setNewStudent] = useState<Omit<Student, '_id'>>({
    name: student?.name || '',
    gender: student?.gender || 'male',
    age: student?.age || 0,
    address: student?.address || '',
  });

  const { fetchStudents } = useContext(StudentContext);

  const {
    error,
    isLoading,
    fetchData: submitStudent,
  } = useFetch<void, Omit<Student, '_id'> | Partial<Student>>(
    {
      url: student ? `students/${student._id}` : 'students',
      method: student ? HTTP_METHODS.PUT : HTTP_METHODS.POST,
    },
    fetchStudents
  );

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await submitStudent(newStudent);
    if (!student) {
      setNewStudent({ name: '', gender: 'male', age: 0, address: '' });
    }
  };

  return (
    <>
      {!error && !isLoading && (
        <tr>
          <td>
            <input
              type="text"
              placeholder="请输入姓名"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setNewStudent((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }));
              }}
              value={newStudent.name}
            />
          </td>
          <td>
            <select
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setNewStudent((prevState) => ({
                  ...prevState,
                  gender: e.target.value as 'male' | 'female',
                }));
              }}
              value={newStudent.gender}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </td>
          <td>
            <input
              type="number"
              placeholder="请输入年龄"
              value={newStudent.age}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setNewStudent((prevState) => ({
                  ...prevState,
                  age: Number(e.target.value),
                }));
              }}
            />
          </td>
          <td>
            <input
              type="text"
              value={newStudent.address}
              placeholder="请输入地址"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewStudent((prevState) => ({
                  ...prevState,
                  address: e.target.value,
                }))
              }
            />
          </td>
          <td>
            {student ? (
              <>
                <button>Cancel</button>
                <button onClick={handleSubmit}>Update</button>
              </>
            ) : (
              <button onClick={handleSubmit}>Add</button>
            )}
          </td>
        </tr>
      )}
      {error && (
        <tr>
          <td colSpan={5} style={{ color: 'red' }}>
            {error}
          </td>
        </tr>
      )}
      {isLoading && (
        <tr>
          <td colSpan={5}>Loading...</td>
        </tr>
      )}
    </>
  );
};

export default StudentForm;
