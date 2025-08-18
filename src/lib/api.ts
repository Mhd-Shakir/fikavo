// // src/lib/api.ts
export const API_BASE = "https://fikavo-backend.onrender.com";

export const authHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) return {};
  return {
    Authorization: `Bearer ${token}`,
  };
};
