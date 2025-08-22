import { LogOut } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClasses = ({ isActive }) =>
    `w-full text-left px-4 py-3 rounded-lg transition-colors ${
      isActive
        ? "bg-blue-100 text-blue-700 font-medium"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <nav className="w-75 bg-white shadow-sm h-screen flex flex-col justify-between text-2xl">
      <div className="p-6">
        <div className="space-y-2 flex flex-col gap-4">
          <NavLink to="/dashboard/overview" className={linkClasses}>
            Dashboard
          </NavLink>
          <NavLink to="/dashboard/stores" className={linkClasses}>
            Stores
          </NavLink>
          <NavLink to="/dashboard/users" className={linkClasses}>
            Users
          </NavLink>
        </div>
      </div>
      <p className="mb-8 mx-auto w-40 h-10 text-xl flex items-center justify-center gap-2 bg-gray-500 rounded-2xl ">User Name <span><LogOut/></span></p>
    </nav>
  );
}
