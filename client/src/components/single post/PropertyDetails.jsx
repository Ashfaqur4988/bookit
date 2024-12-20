/* eslint-disable react/prop-types */
import { Bookmark, MessageCircle } from "lucide-react";
import React from "react";

const PropertyDetails = ({ property, handleChatBoxToggle }) => (
  console.log("single post child, property details"),
  (
    <div className="w-full lg:w-2/5 bg-white p-6 rounded-lg shadow-lg relative h-fit">
      <h2 className="text-xl font-semibold mb-4">Property Details</h2>
      <div className="mb-4">
        <p className="flex items-center gap-2 text-gray-700">
          <span className="font-semibold">Address:</span> {property.address}
        </p>
        <p className="flex items-center gap-2 text-gray-700">
          <span className="font-semibold">City:</span> {property.city}
        </p>
        <p className="flex items-center gap-2 text-gray-700">
          <span className="font-semibold">Type:</span> {property.type}
        </p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Amenities:</h3>
        <ul className="list-disc pl-6 text-gray-700">
          {property.postDetail.amenities.map((amenity, idx) => (
            <li key={idx}>{amenity}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Nearby:</h3>
        <ul className="list-disc pl-6 text-gray-700">
          {property.postDetail.nearby.map((n, idx) => (
            <li key={idx}>{n}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4 flex gap-4">
        <h3 className="font-semibold mb-2">Posted by:</h3>
        <p>{property.user.username}</p>
      </div>

      <div className="flex gap-4 mt-4">
        <button className="btn btn-primary flex items-center gap-2">
          <Bookmark size={16} /> Save Post
        </button>
        <button
          className="btn btn-secondary flex items-center gap-2"
          onClick={handleChatBoxToggle}
        >
          <MessageCircle size={16} /> Chat Now
        </button>
      </div>
    </div>
  )
);

export default React.memo(PropertyDetails, (prevProps, nextProps) => {
  return prevProps.images === nextProps.images; // Custom comparison to avoid unnecessary renders
});
