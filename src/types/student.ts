export interface Student {
  _id: string;
  name: string;
  gender: 'male' | 'female';
  age: number;
  address: string;
}

export interface FetchRequestConfig {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  body?: Omit<Student, '_id'> | Partial<Student>;
}

export interface StudentContextValue {
  fetchStudents: () => void;
}
