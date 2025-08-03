// src/admin/Messages.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

interface Message {
  _id: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  createdAt?: string;
}

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showDeleteForId, setShowDeleteForId] = useState<string | null>(null);
  const navigate = useNavigate();

  const apiBase = import.meta.env.VITE_API_BASE_URL;

  // Grab token; if missing, force login
  const getAuthHeaders = () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return {};
    }
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${apiBase}/api/contact/messages`, {
        headers: getAuthHeaders(),
      });

      if (res.status === 401) {
        // invalid or expired token
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }

      const data = await res.json();
      if (res.ok && data.success) {
        // we want newest first
        setMessages(data.messages);
      } else {
        console.error("Failed to fetch messages:", data.error || data.message);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteMessage = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      const res = await fetch(`${apiBase}/api/contact/messages/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (res.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }

      if (res.ok) {
        fetchMessages();
      } else {
        console.error("Delete failed.");
      }
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  };

  const deleteSelected = async () => {
    if (selected.size === 0) return;
    if (!window.confirm("Delete selected messages?")) return;

    try {
      const res = await fetch(`${apiBase}/api/contact/messages/deleteMany`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ ids: Array.from(selected) }),
      });

      if (res.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }

      if (res.ok) {
        setSelected(new Set());
        fetchMessages();
      } else {
        console.error("Failed to delete selected messages");
      }
    } catch (err) {
      console.error("Error deleting selected:", err);
    }
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const copy = new Set(prev);
      copy.has(id) ? copy.delete(id) : copy.add(id);
      return copy;
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">📩 Contact Messages</h2>
        <button
          onClick={deleteSelected}
          disabled={selected.size === 0}
          className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 disabled:opacity-50"
        >
          🗑️ Delete Selected
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border rounded-md"
        />
      </div>

      <div className="grid gap-6">
        {messages
          .filter((msg) =>
            [msg.name, msg.email, msg.company]
              .join(" ")
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .map((msg) => (
            <div
              key={msg._id}
              className="bg-white border shadow-md rounded-xl p-5 relative"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={selected.has(msg._id)}
                    onChange={() => toggleSelect(msg._id)}
                    className="mt-1"
                  />
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{msg.name}</p>
                    <p className="text-sm text-gray-600">{msg.email}</p>
                    <p className="text-sm text-gray-600">
                      Company: {msg.company || "N/A"}
                    </p>
                    <p className="text-gray-700 mt-2">
                      <strong>Message:</strong> {msg.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {msg.createdAt
                        ? new Date(msg.createdAt).toLocaleString()
                        : ""}
                    </p>
                  </div>
                </div>

                <div className="text-right space-y-2">
                  <button
                    onClick={() =>
                      setShowDeleteForId(
                        showDeleteForId === msg._id ? null : msg._id
                      )
                    }
                    className="text-indigo-600 text-sm hover:underline font-bold"
                  >
                    {showDeleteForId === msg._id ? "Hide Delete" : "Delete"}
                  </button>

                  {showDeleteForId === msg._id && (
                    <button
                      onClick={() => deleteMessage(msg._id)}
                      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded mt-2 text-sm"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Messages;
