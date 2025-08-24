import axios from "axios";
import { LogOut } from "lucide-react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const linkClasses = ({ isActive }) =>
    `w-full text-left px-4 py-3 rounded-lg transition-colors ${
      isActive
        ? "bg-blue-100 text-blue-700 font-medium"
        : "text-gray-600 hover:bg-gray-100"
    }`;

    const handleLogout = async() => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/logout`,
        {},
        { withCredentials: true })
        if(res.status === 200){
          navigate('/');
        }
    } catch (error) {
      console.log(error.message)
    }
    
  };
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
          <NavLink to="/dashboard/createstore" className={linkClasses}>
            CreateStore
          </NavLink>
        </div>
      </div>
      <button onClick={handleLogout} className="mb-8 mx-auto w-40 h-10 text-sm font-medium flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-sm">
        Log Out
        <LogOut className="h-4 w-4" />
      </button>
    </nav>
  );
}
