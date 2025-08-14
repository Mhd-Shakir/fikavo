import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Phone, Copy } from "lucide-react";

interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt?: string;
  read?: boolean;
  // Backend may send different fields; allow any extra keys
  [key: string]: any;
}

// Keys we consider as legit phone fields (case-insensitive)
const PHONE_KEYS = new Set([
  "phone",
  "phonenumber",
  "phone_number",
  "phoneno",
  "phone_no",
  "mobile",
  "mobilenumber",
  "tel",
  "contactnumber",
  "whatsapp",
  "whatsappnumber",
  "whatsApp",
  "whatsAppNumber",
]);

const isIdLikeKey = (k: string) =>
  k === "_id" || k.toLowerCase() === "id" || /id$/i.test(k);

// Value must contain only phone characters and 7–15 digits total
const isLikelyPhoneValue = (v: string) => {
  const s = v.trim();
  // Reject if it contains letters (ObjectIds have letters)
  if (/[a-z]/i.test(s)) return false;
  // Only allow digits, spaces, dashes, parentheses, and leading +
  if (!/^[\d\s()+-]+$/.test(s)) return false;
  const digits = s.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
};

type QueueItem = { o: any; path: string };

// BFS through nested objects/arrays, but only accept values that:
// - come from a recognized phone key, and
// - pass isLikelyPhoneValue
const extractPhone = (msg: any): { value: string; path: string } => {
  if (!msg || typeof msg !== "object") return { value: "", path: "" };
  const visited = new Set<any>();
  const q: QueueItem[] = [{ o: msg, path: "" }];

  while (q.length) {
    const { o, path } = q.shift()!;
    if (!o || typeof o !== "object") continue;
    if (visited.has(o)) continue;
    visited.add(o);

    const entries = Array.isArray(o) ? o.entries() : Object.entries(o);

    for (const entry of entries as any) {
      const [k, v] = Array.isArray(o) ? entry : entry; // keep TS happy
      const p = path ? `${path}.${k}` : String(k);
      const keyLower = String(k).toLowerCase();

      // Skip obvious ID keys
      if (isIdLikeKey(String(k))) continue;

      if (v == null) continue;

      if (typeof v === "string" || typeof v === "number") {
        const s = String(v);
        if (PHONE_KEYS.has(keyLower) && isLikelyPhoneValue(s)) {
          return { value: s.trim(), path: p };
        }
      } else if (typeof v === "object") {
        q.push({ o: v, path: p });
      }
    }
  }

  // No acceptable phone found
  return { value: "", path: "" };
};

const telHrefFrom = (phone: string): string | undefined => {
  const sanitized = phone.replace(/[^\d+]/g, "");
  return sanitized ? `tel:${sanitized}` : undefined;
};

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showDeleteForId, setShowDeleteForId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const navigate = useNavigate();

  const apiBase = import.meta.env.VITE_API_BASE_URL;

  const getAuthHeaders = (): HeadersInit => {
    const token = localStorage.getItem("adminToken");
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${apiBase}/api/contact/messages`, {
        headers: getAuthHeaders(),
      });

      if (res.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin");
        return;
      }

      const data = await res.json();

      if (res.ok && data.success) {
        setMessages(data.messages || []);
      } else {
        console.error("Fetch failed:", data.message || "Unknown error");
      }
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin");
    } else {
      fetchMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;

    try {
      const res = await fetch(`${apiBase}/api/contact/messages/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (res.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin");
        return;
      }

      if (res.ok) {
        fetchMessages();
      } else {
        console.error("Failed to delete message");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const deleteSelected = async () => {
    if (!selected.size) return;
    if (!confirm("Delete selected messages?")) return;

    try {
      const res = await fetch(`${apiBase}/api/contact/messages/deleteMany`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ ids: Array.from(selected) }),
      });

      if (res.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin");
        return;
      }

      if (res.ok) {
        setSelected(new Set());
        fetchMessages();
      } else {
        console.error("Bulk delete failed");
      }
    } catch (err) {
    console.error("Bulk delete error:", err);
    }
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const copy = new Set(prev);
      copy.has(id) ? copy.delete(id) : copy.add(id);
      return copy;
    });
  };

  // Read/unread via checkbox
  const setRead = async (id: string, nextRead: boolean) => {
    try {
      setUpdatingId(id);
      const res = await fetch(`${apiBase}/api/contact/messages/${id}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ read: nextRead }),
      });

      if (res.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin");
        return;
      }

      if (res.ok) {
        setMessages((prev) => prev.map((m) => (m._id === id ? { ...m, read: nextRead } : m)));
      } else {
        console.error("Failed to update read status");
      }
    } catch (err) {
      console.error("Update read error:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const normalizedSearch = search.trim().toLowerCase();

  const filteredAndSorted = messages
    .filter((msg) => {
      const phone = extractPhone(msg).value;
      const blob = `${msg.name || ""} ${msg.email || ""} ${phone}`.toLowerCase();
      return !normalizedSearch || blob.includes(normalizedSearch);
    })
    .sort((a, b) => {
      const aUnread = a.read ? 1 : 0;
      const bUnread = b.read ? 1 : 0;
      if (aUnread !== bUnread) return aUnread - bUnread;
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bTime - aTime;
    });

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      console.error("Clipboard copy failed", e);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Contact Messages</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={deleteSelected}
            disabled={selected.size === 0}
            className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 disabled:opacity-50"
          >
            Delete Selected
          </button>
        </div>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name/email/phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border rounded-md"
        />
      </div>

      {filteredAndSorted.length === 0 ? (
        <div className="text-gray-600 text-center py-16 border rounded-xl bg-white">
          No messages found.
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredAndSorted.map((msg) => {
            const { value: phoneStr } = extractPhone(msg);
            const telHref = phoneStr ? telHrefFrom(phoneStr) : undefined;
            const isUnread = !msg.read;

            return (
              <div
                key={msg._id}
                className={`relative bg-white border rounded-xl p-5 shadow-md ${
                  isUnread ? "border-indigo-200 bg-indigo-50/40" : ""
                }`}
              >
                {isUnread && (
                  <span className="absolute left-3 top-3 inline-block w-2 h-2 rounded-full bg-indigo-500" />
                )}

                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-start gap-4">
                    {/* Selection (bulk delete) */}
                    <input
                      type="checkbox"
                      checked={selected.has(msg._id)}
                      onChange={() => toggleSelect(msg._id)}
                      className="mt-1"
                    />

                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-semibold text-gray-800">{msg.name}</p>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            isUnread ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {isUnread ? "Unread" : "Read"}
                        </span>
                      </div>

                      <p className="text-sm text-blue-600 hover:underline">
                        <a href={`mailto:${msg.email}`}>{msg.email}</a>
                      </p>

                      <div className="mt-1 flex items-center gap-2 text-sm text-gray-700">
                        <Phone size={16} className="text-gray-500" />
                        {phoneStr ? (
                          <>
                            <a
                              className="hover:underline"
                              href={telHref}
                              onClick={(e) => {
                                if (!telHref) e.preventDefault();
                              }}
                            >
                              {phoneStr}
                            </a>
                            <button
                              onClick={() => copyToClipboard(phoneStr)}
                              className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700"
                              title="Copy phone number"
                            >
                              <Copy size={14} />
                              <span className="text-xs">Copy</span>
                            </button>
                          </>
                        ) : (
                          <span className="text-gray-500">N/A</span>
                        )}
                      </div>

                      <p className="text-gray-700 mt-3">
                        <strong>Message:</strong> {msg.message}
                      </p>

                      <p className="text-xs text-gray-400 mt-2">
                        {msg.createdAt && new Date(msg.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Read checkbox + delete */}
                  <div className="text-right space-y-3">
                    <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={!!msg.read}
                        onChange={(e) => setRead(msg._id, e.target.checked)}
                        disabled={updatingId === msg._id}
                        className="h-4 w-4"
                      />
                      <span>{msg.read ? "Read" : "Unread"}</span>
                    </label>

                    <div>
                      <button
                        onClick={() =>
                          setShowDeleteForId(showDeleteForId === msg._id ? null : msg._id)
                        }
                        className="text-indigo-600 text-sm hover:underline font-bold"
                      >
                        {showDeleteForId === msg._id ? "Cancel" : "Delete"}
                      </button>

                      {showDeleteForId === msg._id && (
                        <button
                          onClick={() => deleteMessage(msg._id)}
                          className="ml-3 inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded text-sm"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Messages;