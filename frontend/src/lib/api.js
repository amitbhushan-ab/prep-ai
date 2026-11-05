import axios from 'axios';

const isDevLocalClient =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') &&
  window.location.port !== '5000' &&
  window.location.port !== '';

export const API_BASE =
  import.meta.env.VITE_API_URL || (isDevLocalClient ? 'http://localhost:5000' : '');

const api = axios.create({ baseURL: API_BASE });

export default api;
