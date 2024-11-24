/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const ImageGallery = ({ images }) => (
  <motion.div
    className="grid grid-cols-3 gap-2"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <img
      src={images[0]}
      alt="Main"
      className="col-span-2 h-96 object-fit rounded-lg w-full m-auto"
    />
    <div className="grid grid-rows-2 gap-2">
      {images.slice(1, 3).map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`Small ${idx + 1}`}
          className="h-48 object-fit rounded-lg w-full"
        />
      ))}
    </div>
  </motion.div>
);

export default ImageGallery;
