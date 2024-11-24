import { motion } from "framer-motion";
import { Loader } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Loader className="animate-spin text-primary w-12 h-12" />
        <p className="text-lg font-semibold text-gray-600 mt-4">Loading...</p>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
