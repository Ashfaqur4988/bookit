import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";

const Contact = () => {
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
          Contact Us
        </motion.h1>
        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Contact Info */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-gray-700 mb-4">
              Have questions or feedback? We would love to hear from you! Reach
              out to us using the form below or via the following methods:
            </p>
            <div className="flex items-center gap-2 text-gray-700 mb-2">
              <Mail size={20} />
              <span>support@example.com</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Phone size={20} />
              <span>+1 (123) 456-7890</span>
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-4">Contact Form</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full"
              />
              <textarea
                placeholder="Your Message"
                className="textarea textarea-bordered w-full"
                rows="5"
              ></textarea>
              <motion.button
                className="btn btn-primary w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
