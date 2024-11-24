/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const UserInfo = ({ name }) => {
  return (
    <motion.div
      className="text-center mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold">{name}</h1>
    </motion.div>
  );
};

export default UserInfo;
