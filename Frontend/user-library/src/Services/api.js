import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000',
});

// Add a request interceptor to include the token in headers
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const signUp = (userData) => API.post('/signup', userData);
export const signIn = (userData) => API.post('/signin', userData);
export const signOut = () => API.get('/signout');

export const getAllBooks = () => API.get('/');
export const getBookById = (id) => API.get(`/${id}`);
export const createBook = (bookData) => API.post('/', bookData);
export const updateBook = (id, bookData) => API.put(`/${id}`, bookData);
export const deleteBook = (id) => API.delete(`/${id}`);
