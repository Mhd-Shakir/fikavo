import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [projects, setProjects] = useState<any[]>([]);

  const fetchProjects = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/projects`);
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/projects`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    setTitle("");
    setDescription("");
    setImage(null);
    fetchProjects();
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/projects/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProjects();
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Project Upload Form */}
      <form onSubmit={handleUpload} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
        />
        <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Upload</button>
      </form>

      {/* Project List */}
      <div className="grid grid-cols-3 gap-6">
        {projects.map((p) => (
          <div key={p._id} className="border p-2 rounded shadow">
            <img src={p.imageUrl} alt={p.title} className="w-full h-40 object-cover" />
            <h2 className="font-semibold mt-2">{p.title}</h2>
            <p className="text-sm">{p.description}</p>
            <button
              onClick={() => handleDelete(p._id)}
              className="bg-red-500 text-white px-3 py-1 mt-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
