import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000/api/blogs' });

export const saveDraft = (data) => API.post('/save-draft', data);
export const publishBlog = (data) => API.post('/publish', data);
export const fetchBlogs = () => API.get('/');
export const fetchBlogById = (id) => API.get(`/${id}`);