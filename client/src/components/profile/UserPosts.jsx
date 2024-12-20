/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Edit } from "lucide-react";
import React from "react";

const UserPosts = ({ userPosts }) => {
  console.log("profile page child, user posts");
  return (
    <motion.div
      className="p-4 bg-base-200 rounded-lg shadow-lg mt-6 w-1/2 "
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Edit className="mr-2" /> My Posts
      </h2>
      <div className="flex flex-col gap-4 w-full">
        {!userPosts ? (
          <p>No posts</p>
        ) : (
          userPosts.map((post, index) => (
            <div key={index} className="p-3 bg-white shadow-md rounded-md">
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-600">{post.description}</p>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default React.memo(UserPosts);
