export const API_URL = 'http://localhost:3000/api';
export const accessToken =
  typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
