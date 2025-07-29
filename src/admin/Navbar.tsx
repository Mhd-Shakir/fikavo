import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <Link to="/admin" className="font-bold text-xl">Admin Panel</Link>
      <div className="space-x-4">
        <Link to="/admin" className="hover:underline">Dashboard</Link>
        <Link to="/admin/messages" className="hover:underline">Messages</Link>
      </div>
    </nav>
  );
};

export default Navbar;
