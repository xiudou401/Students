import { createContext } from 'react';
import type { StudentContextValue } from '../types/student';

export const StudentContext = createContext<StudentContextValue>({
  fetchStudents: () => {},
});
