import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="hero h-screen bg-center bg-cover relative"
        style={{
          backgroundImage: "url('/bg.jpg')",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-overlay bg-opacity-70 bg-gradient-to-b from-black via-transparent to-black absolute inset-0"></div>
        <div className="hero-content text-center text-neutral-content z-10 relative">
          <div className="max-w-2xl mx-auto">
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold text-white leading-tight"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Welcome to <span className="text-primary">BOOKiT</span>
            </motion.h1>
            <motion.p
              className="mt-6 text-lg md:text-xl text-gray-300"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Discover your dream home today with our curated listings of
              apartments and flats across the city.
            </motion.p>
            <motion.div
              className="mt-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <Link to="/properties">
                <button className="btn btn-primary px-8 py-3 text-lg">
                  Browse Properties
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
