import { motion } from "framer-motion"; // Framer Motion for animation
import { useState } from "react";

const Filter = () => {
  const [filterProps, setFilterProps] = useState({
    type: "",
    location: "",
    minPrice: "",
    maxPrice: "",
  });

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
            onChange={(e) =>
              setFilterProps({ ...filterProps, type: e.target.value })
            }
            className="select select-bordered w-full"
          >
            <option value="">All Types</option>
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
            value={filterProps.location}
            onChange={(e) =>
              setFilterProps({ ...filterProps, location: e.target.value })
            }
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
              onChange={(e) =>
                setFilterProps({ ...filterProps, minPrice: e.target.value })
              }
              className="input input-bordered w-1/2"
              placeholder="Min"
            />
            <input
              type="number"
              value={filterProps.maxPrice}
              onChange={(e) =>
                setFilterProps({ ...filterProps, maxPrice: e.target.value })
              }
              className="input input-bordered w-1/2"
              placeholder="Max"
            />
          </div>
        </div>

        {/* Apply Filter Button */}
        <button className="btn btn-primary">Apply Filter</button>
      </div>
    </motion.div>
  );
};

export default Filter;
