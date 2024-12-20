/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

const ProfilePicture = ({ profileImage }) => {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <img
        src={profileImage}
        alt="Profile"
        className="rounded-full w-32 h-32 border-4 border-primary shadow-lg"
      />
      <Link to={"/settings"} className="btn btn-sm btn-outline mt-3">
        Update Profile
      </Link>
    </motion.div>
  );
};

export default React.memo(ProfilePicture); // Use React.memo to optimize ProfilePicture;
