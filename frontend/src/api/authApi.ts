import http from './http';

export const login = async (email: string, password: string) => {
  const response = await http.post('/auth/login', { email, password });
  return response.data;
};
