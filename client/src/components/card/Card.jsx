/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { motion } from "framer-motion"; // For animations
import { MapPin, Home, Users, IndianRupee } from "lucide-react"; // Icons from Lucide
import React from "react";

const Card = ({ property }) => {
  return (
    <motion.div
      className="card w-full bg-base-100 shadow-xl flex flex-col lg:flex-row mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Property Image */}
      <PropertyImage property={property} />

      {/* Property Details */}
      <PropertyDetails property={property} />
    </motion.div>
  );
};

export default React.memo(Card);

const PropertyImage = ({ property }) => {
  return (
    <>
      {/* Property Image */}
      <div className="w-full lg:w-1/3">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover rounded-l-lg"
        />
      </div>
    </>
  );
};

const PropertyDetails = ({ property }) => {
  return (
    <>
      {/* Property Details */}
      <div className="card-body p-6 flex flex-col justify-between lg:w-2/3">
        {/* Property Name */}
        <h3 className="text-2xl font-semibold text-gray-800">
          {property.title}
        </h3>

        {/* Property Price */}
        <p className="text-gray-700 flex items-center gap-2">
          <IndianRupee size={16} /> {property.price}
        </p>

        {/* Property Location (City) */}
        <p className="text-gray-500 flex items-center gap-2">
          <MapPin size={16} /> {property.city}
        </p>

        {/* Property Type */}
        <p className="text-gray-500 flex items-center gap-2">
          <Home size={16} /> {property.type}
        </p>

        {/* Nearby */}
        <p className="text-gray-500 flex items-center gap-2">
          <Users size={16} /> Nearby: {property.postDetail.nearby[0]}
        </p>
      </div>
    </>
  );
};
