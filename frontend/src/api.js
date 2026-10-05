const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD
    ? "https://travelsphere-backend-ivqd.onrender.com"
    : "http://localhost:8000");

export default API_BASE_URL;
