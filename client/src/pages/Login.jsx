import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, loading } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    login(formData);
    setFormData({
      email: "",
      password: "",
    });
  };
  return (
    <div className="flex justify-center items-center h-screen bg-base-200">
      <motion.div
        className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          Login
          <LogIn className="inline-block w-6 h-6 ml-2 text-primary" />
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <div className="form-control">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              className="btn btn-primary"
              disabled={loading}
            >
              Login
            </motion.button>
          </div>
        </form>
        <p className="text-sm text-center mt-4">
          Do not have an account?{" "}
          <Link to="/signup" className="text-primary font-semibold">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
