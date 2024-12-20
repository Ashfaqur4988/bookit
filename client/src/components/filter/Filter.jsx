import { motion } from "framer-motion"; // Framer Motion for animation
import React, { useCallback, useState } from "react";
import { usePropertiesStore } from "../../store/usePropertiesStore";

const Filter = () => {
  const { getAllPosts } = usePropertiesStore();
  const [filterProps, setFilterProps] = useState({
    type: "",
    city: "",
    minPrice: "",
    maxPrice: "",
  });

  //prevents child component re-renders unless filterProps or getAllPosts changes.
  const handleQuery = useCallback(() => {
    getAllPosts(filterProps);
  }, [filterProps, getAllPosts]);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFilterProps({ ...filterProps, [name]: value });
    },
    [filterProps]
  );

  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-lg mb-8 h-full flex flex-col justify-between"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Filter Properties</h2>
      <div className="flex flex-col gap-4 h-full">
        {/* Property Type */}
        <div className="form-control flex flex-col">
          <label className="label">
            <span className="label-text">Property Type</span>
          </label>
          <select
            value={filterProps.type}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="">All</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>

        {/* Location */}
        <div className="form-control flex flex-col">
          <label className="label">
            <span className="label-text">City</span>
          </label>
          <input
            type="text"
            value={filterProps.city}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Enter City"
          />
        </div>

        {/* Price Range */}
        <div className="form-control flex flex-col">
          <label className="label">
            <span className="label-text">Price Range</span>
          </label>
          <div className="flex space-x-2 w-full">
            <input
              type="number"
              value={filterProps.minPrice}
              onChange={handleChange}
              className="input input-bordered w-1/2"
              placeholder="Min"
            />
            <input
              type="number"
              value={filterProps.maxPrice}
              onChange={handleChange}
              className="input input-bordered w-1/2"
              placeholder="Max"
            />
          </div>
        </div>

        {/* Apply Filter Button */}
        <button className="btn btn-primary" onClick={handleQuery}>
          Apply Filter
        </button>
      </div>
    </motion.div>
  );
};

export default React.memo(Filter); // Use React.memo to optimize Filter;
