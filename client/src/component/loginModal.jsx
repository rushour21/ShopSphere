import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import axios from "axios";

export default function LoginModal({ onClose }) {
  const [email, setEmail] = useState("rutu@example.com");
  const [password, setPassword] = useState("Rushabh@1234");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        { email, password },
        { withCredentials: true }
      );

      if (res.status === 201) {
        const { user } = res.data;
        dispatch(addUser(user))

        if (user.role === "SYSTEM_ADMIN") {
          navigate("/dashboard", { state: user });
        } else if (user.role === "STORE_OWNER") {
          navigate("/stores");
        } else {
          navigate("/userdashboard", { state: user });
        }
        onClose();
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please try again.");
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 mx-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Login</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-2xl font-bold cursor-pointer"
        >
          &times;
        </button>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleLogin}>
        <input
          type="email"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      {/* Footer */}
      <div className="text-center mt-4">
        <button className="text-blue-600 hover:underline cursor-pointer">
          Create account?
        </button>
      </div>
    </div>
  );
}
