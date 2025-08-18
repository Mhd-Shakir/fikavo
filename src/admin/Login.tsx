// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const apiBase = import.meta.env.VITE_API_BASE_URL;

// const AdminLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await fetch(`${apiBase}/api/admin/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok || !data.token) {
//         setError(data.message || "Invalid credentials");
//         return;
//       }

//       // ✅ Save JWT token
//       localStorage.setItem("adminToken", data.token);

//       // ✅ Redirect to admin messages page
//       navigate("/admin/messages");
//     } catch (err) {
//       setError("Server error. Please try again later.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
//       >
//         <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
//           Admin Login
//         </h2>

//         {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

//         <div className="mb-4">
//           <label className="block mb-1 text-gray-700">Email</label>
//           <input
//             type="email"
//             className="w-full border border-gray-300 px-3 py-2 rounded-md"
//             value={email}
//             onChange={(e) => {
//               setEmail(e.target.value);
//               setError("");
//             }}
//             required
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block mb-1 text-gray-700">Password</label>
//           <input
//             type="password"
//             className="w-full border border-gray-300 px-3 py-2 rounded-md"
//             value={password}
//             onChange={(e) => {
//               setPassword(e.target.value);
//               setError("");
//             }}
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;
import React, { useState } from "react";
import { API_BASE } from "../lib/api";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      // ✅ Save token
      localStorage.setItem("token", data.token);

      // Redirect to admin/projects
      navigate("/admin/projects");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={onSubmit}
        className="w-80 border rounded p-6 space-y-4 bg-white shadow"
      >
        <h1 className="text-xl font-bold">Admin Login</h1>

        <div>
          <label className="block text-sm">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border px-2 py-1 w-full"
          />
        </div>

        <div>
          <label className="block text-sm">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border px-2 py-1 w-full"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded w-full disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;

