import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.API || 'http://localhost:3000',
    headers: {
        'Access-Control-Allow-Origin': process.env.API || 'http://localhost:3000',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
})
