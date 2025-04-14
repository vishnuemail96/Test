import axios from 'axios';

const API = axios.create({
baseURL: 'https://orbilearn.com/api'
});

export const getCourseById = (id) => API.get(`/courses/${id}/`);
