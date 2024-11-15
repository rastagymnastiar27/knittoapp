import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://pixabay.com/api/', // Ganti dengan base URL API kamu
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
