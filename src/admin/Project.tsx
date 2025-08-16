import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_ORIGIN = import.meta.env.VITE_API_ORIGIN as string; // http://localhost:5001
const API_URL = import.meta.env.VITE_API_URL as string;       // http://localhost:5001/api

const api = axios.create({ baseURL: API_URL });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

type Project = {
  _id: string;
  title: string;
  image: string; // /uploads/...
  date: string;  // ISO string
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(''); // yyyy-mm-dd
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    const res = await api.get('/admin/projects');
    setProjects(res.data);
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) { alert('Choose an image'); return; }
    const fd = new FormData();
    fd.append('title', title);
    fd.append('date', date || new Date().toISOString().slice(0,10)); // default today
    fd.append('image', image);

    setLoading(true);
    try {
      const res = await api.post('/admin/projects', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setProjects(prev => [res.data, ...prev]);
      setTitle('');
      setDate('');
      setImage(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    await api.delete(`/admin/projects/${id}`);
    setProjects(prev => prev.filter(p => p._id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Projects</h1>

      <form onSubmit={handleCreate} className="space-y-3">
        <input
          className="border p-2 w-full"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          type="date"
          className="border p-2"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={e => setImage(e.target.files?.[0] || null)}
          required
        />
        <button className="bg-black text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? 'Saving…' : 'Add Project'}
        </button>
      </form>

      <ul className="space-y-3">
        {projects.map(p => (
          <li key={p._id} className="border rounded p-3 flex items-center gap-3">
            <img src={`${API_ORIGIN}${p.image}`} className="w-16 h-16 object-cover rounded" alt={p.title} />
            <div className="flex-1">
              <div className="font-semibold">{p.title}</div>
              <div className="text-sm text-gray-600">{new Date(p.date).toLocaleDateString()}</div>
            </div>
            <button onClick={() => handleDelete(p._id)} className="bg-red-600 text-white px-3 py-1 rounded">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}