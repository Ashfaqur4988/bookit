import { motion } from "framer-motion";
import { LogIn, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";

const Navbar = () => {
  const { user, logout } = useUserStore();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar bg-white shadow-md sticky top-0 z-50">
      <div className="flex-1">
        <motion.a
          whileHover={{ scale: 1.1 }}
          className="btn btn-ghost text-xl font-bold text-primary"
        >
          <Link to="/">BOOKiT</Link>
        </motion.a>
        <div className="ml-4 space-x-4 hidden lg:flex">
          <Link to="/properties">
            <motion.a
              whileHover={{ scale: 1.1 }}
              className="btn btn-ghost normal-case text-base"
            >
              Properties
            </motion.a>
          </Link>
          <Link to="/about">
            <motion.a
              whileHover={{ scale: 1.1 }}
              className="btn btn-ghost normal-case text-base"
            >
              About Us
            </motion.a>
          </Link>
          <Link to="/contact">
            <motion.a
              whileHover={{ scale: 1.1 }}
              className="btn btn-ghost normal-case text-base"
            >
              Contact
            </motion.a>
          </Link>
          {user && (
            <Link to="/add-property">
              <motion.a
                whileHover={{ scale: 1.1 }}
                className="btn btn-ghost normal-case text-base"
              >
                Add Property
              </motion.a>
            </Link>
          )}
        </div>
      </div>
      <div className="flex-none gap-4">
        {user ? (
          <>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User avatar"
                    src={user.profilePicture || "/noavatar.jpg"}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/settings">Settings</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>
                    Logout
                    <LogOut className="w-4 h-4 ml-2" />
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="btn btn-outline btn-primary"
              >
                Login
                <LogIn className="w-4 h-4 ml-2" />
              </motion.button>
            </Link>
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="btn btn-primary text-white"
              >
                Sign Up
              </motion.button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
