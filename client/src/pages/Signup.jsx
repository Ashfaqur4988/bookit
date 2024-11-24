import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signup, loading } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    signup(formData);
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
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
          Sign Up
          <UserPlus className="inline-block w-6 h-6 ml-2 text-primary" />
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="input input-bordered"
              name="username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
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
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter confirm password"
              className="input input-bordered"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
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
              Sign Up
            </motion.button>
          </div>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-semibold">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;
