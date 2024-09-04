import axios from "axios";

const BASE_API__URL = 'http://localhost:8080/api/courses';

export const createCourse = (course) => {
    return axios.post(BASE_API__URL, course);
};

export const getAllCourses = () => {
    return axios.get(BASE_API__URL);
};

export const getCourseById = (id) => {
    return axios.get(`${BASE_API__URL}/${id}`);
};

export const deleteCourse = (id) => {
    return axios.delete(`${BASE_API__URL}/${id}`);
};

