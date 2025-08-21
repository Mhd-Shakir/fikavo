import React, { useState } from "react";
import axios from "axios";

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select an image");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", file); // 👈 must match backend's upload.single("image")

    try {
      setLoading(true);
      const res = await axios.post(
        // ✅ Fixed: Use consistent environment variable
        `${import.meta.env.VITE_API_BASE_URL}/api/projects`,
        formData,
        { 
          headers: { 
            "Content-Type": "multipart/form-data",
            // Add auth token if needed
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          } 
        }
      );

      console.log("✅ Project uploaded:", res.data);
      alert("Project uploaded successfully!");
      
      // Reset form
      setTitle("");
      setDescription("");
      setFile(null);
      
    } catch (err) {
      console.error("❌ Upload error:", err);
      console.error("Error response:", err.response?.data);
      alert("Upload failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white shadow rounded-md">
      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        placeholder="Project Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-full"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload Project"}
      </button>
    </form>
  );
};

export default AddProject;