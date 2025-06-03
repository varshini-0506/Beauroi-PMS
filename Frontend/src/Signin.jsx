/*import { useState } from "react";
import { motion } from "framer-motion";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    role: "Admin",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      
      <div className="absolute inset-0 bg-[url('https://ik.imagekit.io/mino2112/urban-building-skyscrapers-shanghai-financial-district_1417-3052.jpg?updatedAt=1739955060850')] bg-cover bg-center filter blur-sm"></div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg w-96 border border-white/20"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">
          {isSignUp ? "Create Account" : "Sign In"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-white">Select Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-white/20 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="Admin">Admin</option>
                <option value="Property Manager">Property Manager</option>
                <option value="Tenant">Tenant</option>
                <option value="Accountant">Accountant</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-lg bg-white/20 text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-lg bg-white/20 text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-white">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full p-2 rounded-lg bg-white/20 text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600 transition-all font-semibold"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </motion.button>
        </form>

        <p className="text-center text-sm text-white mt-3">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <span
            className="text-black cursor-pointer hover:underline ml-1"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? " Sign In" : " Sign Up"}
          </span>
        </p>
      </motion.div>
    </div>
  );
}*/

import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    role: "admin",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
     // Add role validation for signup
  if (isSignUp && !formData.role) {
    alert("Please select a role!");
    return;
  }
    if (isSignUp && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const endpoint = isSignUp
      ? "http://localhost:5000/signup"
      : "http://localhost:5000/signin";

    try {
      console.log('FormData being sent:', formData);
      const { data } = await axios.post(endpoint, formData);
      console.log(data);
      console.log("Complete response:", data);
      alert(data.message);
            if (!isSignUp) {
        localStorage.setItem("token", data.token);
        const role = data.data.role?.toLowerCase();
      console.log("User role:", role);

      // Redirect based on role
      switch (role) {
        case "admin":
          navigate("/user/dashboard");
          break;
        case "propertymanager":
          navigate("/dashboard");
          break;
        case "tenant":
          navigate("/user/tenantDashboard");
          break;
        case "accountant":
          navigate("/dashboard");
          break;
        default:
          navigate("/user/dashboard");
      }
    } else {
        setIsSignUp(false); // Switch to Sign In page after Sign Up
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('https://ik.imagekit.io/mino2112/urban-building-skyscrapers-shanghai-financial-district_1417-3052.jpg?updatedAt=1739955060850')] bg-cover bg-center filter blur-sm"></div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg w-96 border border-white/20"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">
          {isSignUp ? "Create Account" : "Sign In"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-white">Select Role</label>
              <select
  name="role"
  value={formData.role}
  onChange={handleChange}
  required
  className="w-full p-2 rounded-lg bg-white/20 text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
>
  <option value="">Select a role</option>
  <option value="admin">Admin</option>
  <option value="propertyManager">Property Manager</option>
  <option value="tenant">Tenant</option>
  <option value="accountant">Accountant</option>
</select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-lg bg-white/20 text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 rounded-lg bg-white/20 text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-white">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full p-2 rounded-lg bg-white/20 text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600 transition-all font-semibold"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </motion.button>
        </form>

        <p className="text-center text-sm text-white mt-3">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <span
            className="text-black cursor-pointer hover:underline ml-1"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? " Sign In" : " Sign Up"}
          </span>
        </p>
      </motion.div>
    </div>
  );
}
