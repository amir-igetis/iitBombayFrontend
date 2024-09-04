import axios from "axios";

const BASE_API__URL = 'http://localhost:8080/api/instances';

export const createInstance = (instance) => {
    return axios.post(BASE_API__URL, instance);
};

export const getInstancesByYearAndSemester = (year, semester) => {
    return axios.get(`${BASE_API__URL}/${year}/${semester}`);
};

export const getInstanceById = (year, semester, id) => {
    return axios.get(`${BASE_API__URL}/${year}/${semester}/${id}`);
};

export const deleteInstance = (year, semester, id) => {
    return axios.delete(`${BASE_API__URL}/${year}/${semester}/${id}`);
};

