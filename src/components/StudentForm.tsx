import React, { ChangeEvent, MouseEvent, useContext, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { StudentContext } from '../store/studentContext';
// 注意：导入类型（不是组件！），如果 StudentItem 组件里导出了 Student 类型，也可以从那导入
import type { Student } from '../types/student';

// 🌟 修正 Props 类型：student 是 Student 接口类型，不是组件
interface StudentFormProps {
  student?: Student | null; // 编辑时传学生数据，新增时不传
  onCancelEdit?: () => void; // 取消编辑（仅编辑时用）
}

const StudentForm: React.FC<StudentFormProps> = ({ student, onCancelEdit }) => {
  // 🌟 修正 newStudent 类型 + age 初始值（改为 number，对齐 Student 接口）
  const [newStudent, setNewStudent] = useState<Omit<Student, '_id'>>({
    name: student?.name || '',
    gender: student?.gender || 'male',
    age: student?.age || 0, // 初始值为 0（number 类型），而非空字符串
    address: student?.address || '',
  });

  const { fetchStudents } = useContext(StudentContext);

  // 🌟 给 useFetch 加泛型：T=Student（返回值），P=Omit<Student, '_id'>（提交参数，不含 _id）
  const {
    error,
    isLoading,
    fetchData: submitStudent, // 改名：updateStudent → submitStudent（语义更准）
  } = useFetch<Student, Omit<Student, '_id'>>(
    {
      url: student ? `students/${student._id}` : 'students',
      method: student ? 'put' : 'post',
    },
    fetchStudents // 提交成功后刷新列表
  );

  // 🌟 修正点击事件：删无意义的 e.preventDefault()，加输入校验
  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    // 输入校验：姓名不能为空，年龄必须大于 0
    if (!newStudent.name.trim()) {
      alert('请输入学生姓名！');
      return;
    }
    if (newStudent.age <= 0 || isNaN(newStudent.age)) {
      alert('请输入有效的年龄（大于 0 的数字）！');
      return;
    }

    // 提交数据
    await submitStudent(newStudent);

    // 编辑模式下，提交后取消编辑（可选）
    if (student && onCancelEdit) {
      onCancelEdit();
    } else if (!student) {
      // 新增模式下，提交后清空表单
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
              value={newStudent.name}
              placeholder="请输入姓名"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewStudent((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
            />
          </td>
          <td>
            {/* 🌟 修正 select 的 onChange 事件类型：HTMLSelectElement */}
            <select
              value={newStudent.gender}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setNewStudent((prevState) => ({
                  ...prevState,
                  gender: e.target.value as 'male' | 'female', // 限定性别值
                }))
              }
            >
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </td>
          <td>
            <input
              type="number"
              value={newStudent.age}
              min={1} // 限制最小年龄为 1
              placeholder="请输入年龄"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewStudent((prevState) => ({
                  ...prevState,
                  age: Number(e.target.value), // 转为 number 类型
                }))
              }
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
            {/* 🌟 修正 NotEdit → onCancelEdit（Props 里的方法） */}
            {student ? (
              <>
                <button onClick={handleSubmit} disabled={isLoading}>
                  update
                </button>
                <button onClick={onCancelEdit} disabled={isLoading}>
                  cancel
                </button>
              </>
            ) : (
              <button onClick={handleSubmit} disabled={isLoading}>
                add
              </button>
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
