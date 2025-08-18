// Frontend/src/lib/api.ts
export const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

export const authHeaders = () => {
  const token = localStorage.getItem('token'); // use your actual key
  return token ? { Authorization: `Bearer ${token}` } : {};
};