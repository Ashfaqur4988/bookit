import { motion } from "framer-motion";
import { XSquare } from "lucide-react";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";
import { usePropertiesStore } from "../../store/usePropertiesStore";
import { useNavigate } from "react-router-dom";

const PropertyForm = () => {
  const navigate = useNavigate();
  const { createPost } = usePropertiesStore();
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    images: [],
    type: "",
    address: "",
    city: "",
  });
  const [amenities, setAmenities] = useState([]);
  const [nearby, setNearby] = useState([]);
  const [amenityInput, setAmenityInput] = useState("");
  const [nearbyInput, setNearbyInput] = useState("");

  const addAmenity = () => {
    if (amenityInput.trim()) {
      setAmenities([...amenities, amenityInput]);
      setAmenityInput("");
    }
  };

  const addNearby = () => {
    if (nearbyInput.trim()) {
      setNearby([...nearby, nearbyInput]);
      setNearbyInput("");
    }
  };

  const removeAmenity = (index) => {
    setAmenities(amenities.filter((_, i) => i !== index));
  };

  const removeNearby = (index) => {
    setNearby(nearby.filter((_, i) => i !== index));
  };

  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    const uploadedImages = [];

    setIsLoading(true);
    setUploadError(null);

    for (let file of files) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "bookit");
      data.append("cloud_name", "zizicloud");
      data.append("folder", "bookit/posts");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/zizicloud/image/upload",
          data
        );
        uploadedImages.push(response.data.secure_url);
      } catch (error) {
        console.log("Error in image upload", error);
      }
    }

    setImages((prevImages) => {
      const updatedImages = [...prevImages, ...uploadedImages];
      setFormData((prevFormData) => ({
        ...prevFormData,
        images: updatedImages,
      }));
      return updatedImages;
    });
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form submission logic here
    const post = {
      postData: {
        title: formData.title,
        price: formData.price,
        images: formData.images,
        address: formData.address,
        city: formData.city,
        type: formData.type,
      },
      postDetail: {
        description: formData.description,
        amenities: amenities,
        nearby: nearby,
      },
    };
    // console.log(post);

    await createPost(post);

    setFormData({
      title: "",
      description: "",
      price: "",
      images: [],
      type: "",
      address: "",
      city: "",
    });
    setAmenities([]);
    setNearby([]);
    setImages([]);
    navigate(`/properties`);
  };

  return (
    <>
      <motion.div
        className="container mx-auto p-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Add New Property
        </h1>
        <form
          className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6"
          onSubmit={handleSubmit}
        >
          {/* Title */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-semibold">Title</span>
            </label>
            <input
              type="text"
              placeholder="Enter property title"
              className="input input-bordered w-full"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* Price */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-semibold">Price</span>
            </label>
            <input
              type="number"
              placeholder="Enter price"
              className="input input-bordered w-full"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </div>

          {/* Images */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-semibold">Images</span>
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              className="file-input file-input-bordered mb-2"
              onChange={handleImageUpload}
            />
            {isLoading && <p className="text-blue-500">Uploading images...</p>}
            {uploadError && <p className="text-red-500">{uploadError}</p>}
            <div className="flex gap-2 mt-2 flex-wrap">
              {images.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Uploaded ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          {/* Address */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-semibold">Address</span>
            </label>
            <input
              type="text"
              placeholder="Enter address"
              className="input input-bordered w-full"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>

          {/* City */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-semibold">City</span>
            </label>
            <input
              type="text"
              placeholder="Enter city"
              className="input input-bordered w-full"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />
          </div>

          {/* Type */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-semibold">Type</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
            </select>
          </div>

          {/* Description */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-semibold">Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Enter property description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            ></textarea>
          </div>

          {/* Amenities */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-semibold">Amenities</span>
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Add amenity"
                value={amenityInput}
                onChange={(e) => setAmenityInput(e.target.value)}
                className="input input-bordered flex-grow"
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={addAmenity}
              >
                <AiOutlinePlus />
              </button>
            </div>
            <ul>
              {amenities.map((amenity, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>{amenity}</span>
                  <XSquare
                    className="cursor-pointer text-red-500"
                    onClick={() => removeAmenity(index)}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Nearby */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-semibold">Nearby</span>
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Add nearby place"
                value={nearbyInput}
                onChange={(e) => setNearbyInput(e.target.value)}
                className="input input-bordered flex-grow"
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={addNearby}
              >
                <AiOutlinePlus />
              </button>
            </div>
            <ul>
              {nearby.map((place, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>{place}</span>
                  <XSquare
                    className="cursor-pointer text-red-500"
                    onClick={() => removeNearby(index)}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Submit Button */}
          <button
            className="btn btn-primary w-full mt-4"
            type="submit"
            disabled={isLoading}
          >
            Submit Property
          </button>
        </form>
      </motion.div>
    </>
  );
};

export default PropertyForm;
