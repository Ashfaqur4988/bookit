import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePropertiesStore } from "../store/usePropertiesStore";
import ImageGallery from "../components/single post/ImageGallery";
import PropertyDetails from "../components/single post/PropertyDetails";
import ReviewSection from "../components/single post/ReviewSection";
import ChatBox from "../components/single post/ChatBox";
import { IndianRupee } from "lucide-react";
import { motion } from "framer-motion";
import LoadingSpinner from "../components/loading spinner/LoadingSpinner";

const SinglePost = () => {
  const [showChatBox, setShowChatBox] = useState(false);
  const { getSinglePost, property, loading } = usePropertiesStore();
  const { id } = useParams();

  useEffect(() => {
    getSinglePost(id);
  }, [getSinglePost, id]);

  const handleChatBoxToggle = () => {
    setShowChatBox(!showChatBox);
  };

  if (loading) {
    return <LoadingSpinner />; // Show spinner while loading
  }

  if (!property) {
    return <div className="text-center py-20 text-lg">Property not found.</div>; // Handle the case when no property is found
  }

  return (
    <div className="container mx-auto px-4 py-8 w-full">
      <ImageGallery images={property.images} />
      <div className="flex flex-wrap gap-4 relative">
        {/* Left Section */}
        <div className="w-full lg:w-3/5">
          <motion.h1
            className="text-4xl font-bold mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {property.title}
          </motion.h1>
          <motion.p
            className="text-2xl text-green-500 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <IndianRupee size={24} className="inline" /> {property.price} /
            month
          </motion.p>
          <motion.p
            className="text-gray-700 leading-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            {property.postDetail.description}
          </motion.p>
        </div>
        <PropertyDetails
          property={property}
          handleChatBoxToggle={handleChatBoxToggle}
        />
        <ReviewSection postId={id} />
        <ChatBox isOpen={showChatBox} onClose={handleChatBoxToggle} />
      </div>
    </div>
  );
};

export default SinglePost;
