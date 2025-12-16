import { createContext } from 'react';
import { StudentContextValue } from '../types/student';

export const StudentContext = createContext<StudentContextValue>({
  fetchStudents: () => {},
});
