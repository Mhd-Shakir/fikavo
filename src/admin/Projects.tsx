// Frontend/src/admin/Projects.tsx
import React, { useEffect, useState } from 'react';
import { API_BASE, authHeaders } from '../lib/api';

type Project = {
  _id: string;
  title: string;
  image: { url: string; publicId: string };
  date: string;
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    const res = await fetch(`${API_BASE}/api/projects`);
    const data = await res.json();
    setProjects(data);
  };

  useEffect(() => {
    load();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!title || !file) {
      setError('Title and image are required');
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('title', title);
      if (date) fd.append('date', date);
      fd.append('image', file);

      const res = await fetch(`${API_BASE}/api/projects`, {
        method: 'POST',
        headers: {
          ...authHeaders(),
        },
        body: fd,
      });

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.message || 'Upload failed');
      }

      setTitle('');
      setDate('');
      setFile(null);
      await load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.message || 'Delete failed');
      }
      setProjects((p) => p.filter((x) => x._id !== id));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-semibold">Projects</h1>

      <form onSubmit={onSubmit} className="space-y-3 border p-4 rounded">
        <div>
          <label className="block text-sm">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border px-2 py-1 w-full"
            placeholder="Project title"
            required
          />
        </div>

        <div>
          <label className="block text-sm">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border px-2 py-1"
          />
        </div>

        <div>
          <label className="block text-sm">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      <div className="grid gap-4 md:grid-cols-3">
        {projects.map((p) => (
          <div key={p._id} className="border rounded p-2">
            <img src={p.image.url} alt={p.title} className="w-full h-48 object-cover rounded" />
            <div className="mt-2">
              <div className="font-medium">{p.title}</div>
              <div className="text-xs text-gray-500">
                {new Date(p.date || p as any).toLocaleDateString()}
              </div>
              <button
                onClick={() => onDelete(p._id)}
                className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;