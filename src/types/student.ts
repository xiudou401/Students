export interface Student {
  _id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  address: string;
}

export const HTTP_METHODS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
};

export interface FetchRequestConfig {
  url: string;
  method:
    | typeof HTTP_METHODS.GET
    | typeof HTTP_METHODS.POST
    | typeof HTTP_METHODS.PUT
    | typeof HTTP_METHODS.DELETE;
  body?: Omit<Student, '_id'> | Partial<Student>;
}

export interface StudentContextValue {
  fetchStudents: () => void;
}
