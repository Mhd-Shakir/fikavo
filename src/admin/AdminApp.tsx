// src/admin/AdminApp.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminNavbar from './Navbar';
import Dashboard from './Dashboard';
import Messages from './Messages';
import AdminLogin from './Login'; // ✅ login page
import ProtectedRoute from './ProtectedRoute'; // ✅ wrapper component

const AdminApp = () => {
  const token = localStorage.getItem('adminToken');

  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/login" element={<AdminLogin />} />

        <Route
          path="/"
          element={
            <ProtectedRoute token={token}>
              <AdminNavbar />
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/messages"
          element={
            <ProtectedRoute token={token}>
              <AdminNavbar />
              <Messages />
            </ProtectedRoute>
          }
        />

        {/* redirect unknown route */}
        <Route path="*" element={<Navigate to={token ? '/admin' : '/admin/login'} />} />
      </Routes>
    </div>
  );
};

export default AdminApp;
