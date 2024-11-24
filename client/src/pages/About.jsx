import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-white shadow-lg rounded-lg p-6">
        <motion.h1
          className="text-4xl font-bold text-center mb-4"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          About Us
        </motion.h1>
        <motion.p
          className="text-gray-700 text-lg leading-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Welcome to our platform! Our mission is to provide a seamless and
          user-friendly experience for all your needs. We value innovation,
          reliability, and trust. Our team is dedicated to building tools that
          empower individuals and businesses.
        </motion.p>
        <motion.div
          className="flex justify-center mt-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/team.jpg"
            alt="Team"
            className="rounded-lg shadow-lg w-3/4"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
