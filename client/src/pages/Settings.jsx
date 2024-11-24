import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { useUserStore } from "../store/useUserStore";
import axios from "axios";
import LoadingSpinner from "../components/loading spinner/LoadingSpinner";

const SettingsPage = () => {
  const { user, loading, updateUser } = useUserStore();

  const [image, setImage] = useState("");

  const [formData, setFormData] = useState({
    username: user.username || "",
    email: user.email || "",
    profilePicture: user.profilePicture || "",
    oldPassword: "",
    newPassword: "",
  });

  const [imageLoading, setImageLoading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    setImageLoading(true);
    setUploadError(null);

    if (!file) {
      return;
    }

    const data = new FormData();

    data.append("file", file);
    data.append("upload_preset", "bookit");
    data.append("cloud_name", "zizicloud");
    data.append("folder", "bookit/profile");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/zizicloud/image/upload",
        data
      );
      console.log(response.data);
      setImage(response.data.secure_url);
      console.log(`image: ${image}`);
    } catch (error) {
      console.log("Error in image upload", error);
    }

    setImageLoading(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData((prevState) => ({ ...prevState, profilePicture: image }));
    console.log(formData);

    updateUser(formData);
  };

  useEffect(() => {
    // Optionally sync formData with the image when it changes
    setFormData((prevState) => ({
      ...prevState,
      profilePicture: image,
    }));
  }, [image]);

  if (loading) {
    return <LoadingSpinner />; // Show spinner while loading
  }

  if (!user) {
    return <div className="text-center py-20 text-lg">User not found.</div>; // Handle the case when no property is found
  }

  return (
    <motion.div
      className="container mx-auto p-6 bg-base-100 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-center mb-6">Update Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Profile Picture */}
        <div className="flex items-center justify-center">
          <div className="relative">
            <img
              src={user.profilePicture ? user.profilePicture : "/noavatar.jpg"}
              alt="Profile"
              className="rounded-full w-24 h-24 border-4 border-primary shadow-lg"
            />
            <label
              htmlFor="profilePicture"
              className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer"
            >
              <Camera size={20} />
            </label>
            <input
              type="file"
              id="profilePicture"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {imageLoading && (
              <p className="text-blue-500">Uploading images...</p>
            )}
          </div>
        </div>

        {/* Username */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">Username</span>
          </label>
          <input
            type="text"
            placeholder="Enter your username to update"
            name="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="input input-bordered w-full"
          />
        </div>

        {/* Email */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">Email</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email to update"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="input input-bordered w-full"
          />
        </div>

        {/* Old Password */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">Old Password</span>
          </label>
          <input
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={(e) =>
              setFormData({ ...formData, oldPassword: e.target.value })
            }
            placeholder="Enter your old password"
            className="input input-bordered w-full"
          />
        </div>

        {/* New Password */}
        <div>
          <label className="label">
            <span className="label-text font-semibold">New Password</span>
          </label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={(e) =>
              setFormData({ ...formData, newPassword: e.target.value })
            }
            placeholder="Enter your new password"
            className="input input-bordered w-full"
          />
        </div>

        {/* Save Button */}
        <motion.button
          type="submit"
          className="btn btn-primary flex items-center justify-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={imageLoading}
        >
          <FaSave size={20} />
          Save
        </motion.button>
      </form>
    </motion.div>
  );
};

export default SettingsPage;
