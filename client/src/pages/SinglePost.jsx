import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePropertiesStore } from "../store/usePropertiesStore";
import ImageGallery from "../components/single post/ImageGallery";
import PropertyDetails from "../components/single post/PropertyDetails";
import ReviewSection from "../components/single post/ReviewSection";
import ChatBox from "../components/single post/ChatBox";
import { IndianRupee, Trash2, Edit3 } from "lucide-react";
import { motion } from "framer-motion";
import LoadingSpinner from "../components/loading spinner/LoadingSpinner";
import { useUserStore } from "../store/useUserStore";

const SinglePost = () => {
  const [showChatBox, setShowChatBox] = useState(false);
  const { getSinglePost, property, loading, deletePost } = usePropertiesStore();
  const { user } = useUserStore();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getSinglePost(id);
  }, [getSinglePost, id]);

  const handleChatBoxToggle = () => {
    setShowChatBox(!showChatBox);
  };

  const handleDelete = async () => {
    console.log("Delete property:", property.id); // Replace with your delete logic
    await deletePost(property.id);
    navigate("/properties");
  };

  const handleUpdate = () => {
    console.log("Update property:", property.id); // Replace with your update logic
    navigate("/update-post");
  };

  if (loading) {
    return <LoadingSpinner />; // Show spinner while loading
  }

  if (!property) {
    return <div className="text-center py-20 text-lg">Property not found.</div>; // Handle the case when no property is found
  }

  return (
    property && (
      <div className="container mx-auto px-4 py-8 w-full">
        <ImageGallery images={property.images} />
        <div className="flex flex-wrap gap-4 relative">
          {/* Left Section */}
          <div className="w-full lg:w-3/5">
            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold mb-2">{property.title}</h1>
              {user.id === property.user.id && (
                <div className="flex gap-2">
                  <motion.button
                    onClick={handleUpdate}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Edit3 size={16} /> Update
                  </motion.button>
                  <motion.button
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Trash2 size={16} /> Delete
                  </motion.button>
                </div>
              )}
            </motion.div>
            <motion.div
              className="flex items-center justify-between text-2xl text-green-500 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <p>
                <IndianRupee size={24} className="inline" /> {property.price} /
                month
              </p>
            </motion.div>
            <motion.div
              className="flex items-center justify-between text-gray-700 leading-7"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9 }}
            >
              <p>{property.postDetail.description}</p>
            </motion.div>
          </div>
          <PropertyDetails
            property={property}
            handleChatBoxToggle={handleChatBoxToggle}
          />
          <ReviewSection postId={id} />
          <ChatBox isOpen={showChatBox} onClose={handleChatBoxToggle} />
        </div>
      </div>
    )
  );
};

export default SinglePost;
