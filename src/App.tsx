import React, { useEffect } from 'react';
import { useFetch } from './hooks/useFetch';
import StudentList from './components/StudentList'; // 接收 students 数组的列表组件
import { StudentContext } from './store/studentContext';
import { Student } from './types/student';
import StudentForm from './components/StudentForm';

const App: React.FC = () => {
  // 获取学生列表：泛型 T=Student[]（返回数组），P=void（无参）
  const {
    data: students = [], // 兜底空数组，避免 undefined
    isLoading,
    error,
    fetchData: fetchStudents,
  } = useFetch<Student[], void>({ url: 'students', method: 'get' });

  // 初始化加载学生列表
  useEffect(() => {
    fetchStudents();
  }, []); // 补全依赖项

  return (
    <StudentContext.Provider value={{ fetchStudents }}>
      <div style={{ padding: '20px' }}>
        <h1>学生管理</h1>

        {/* 全局错误提示（优先展示） */}
        {error && <p style={{ color: 'red', margin: '10px 0' }}>{error}</p>}

        {/* 学生增删改表格 */}
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
            {/* 1. 新增学生的表单（仅渲染一次） */}
            <StudentForm />

            {/* 2. 加载中状态（表格内） */}
            {isLoading && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center' }}>
                  Loading students...
                </td>
              </tr>
            )}

            {/* 3. 学生列表（非加载、无错误时展示） */}
            {!isLoading && !error && <StudentList students={students ?? []} />}

            {/* 4. 暂无数据提示 */}
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
