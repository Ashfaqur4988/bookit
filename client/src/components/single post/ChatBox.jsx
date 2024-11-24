/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const ChatBox = ({ isOpen, onClose, postOwner }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="absolute top-0 right-0 bg-white shadow-lg rounded-lg p-4 w-[20%] h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-4 border-b pb-2 mb-4">
        <img
          src={
            postOwner.profileImage ? postOwner.profileImage : "/noavatar.jpg"
          }
          alt="John Doe"
          className="w-10 h-10 rounded-full"
        />
        <h3 className="text-lg font-semibold">{postOwner.username}</h3>
      </div>
      <div className="overflow-y-auto h-[calc(100%-10rem)] mb-4">
        <div className="mb-2">
          <div className="bg-gray-100 p-2 rounded-md max-w-[80%]">
            Hi, I’m interested in your property!
          </div>
        </div>
        <div className="mb-2 text-right">
          <div className="bg-blue-500 text-white p-2 rounded-md max-w-[80%] ml-auto">
            Sure! Let me know if you have questions.
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <textarea
          className="textarea textarea-bordered flex-1 resize-none"
          placeholder="Type your message..."
          rows="1"
        ></textarea>
        <button className="btn btn-primary">Send</button>
      </div>
    </motion.div>
  );
};

export default ChatBox;
