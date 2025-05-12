import axios from 'axios';

const http = axios.create({
  baseURL: 'https://inventory-management-f4ie.onrender.com', 
  withCredentials: true,
});

export default http;
