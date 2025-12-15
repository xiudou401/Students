import { createContext } from 'react';
import { StudentContextValue } from '../types/student';

export const studentContext = createContext<StudentContextValue>({
  fetchStudents: () => {},
});
