// src/lib/api.ts
export const API_BASE = "https://fikavo-backend.onrender.com";

// Always read the key you actually store after login: "adminToken"
export const authHeaders = () => {
  const token = localStorage.getItem("adminToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
