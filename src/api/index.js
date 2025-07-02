import axios from 'axios';

const api = axios.create({
  baseURL: 'https://four458aiagent.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;