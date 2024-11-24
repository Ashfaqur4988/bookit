import { useEffect } from "react";
import Card from "../components/card/Card";
import Filter from "../components/filter/Filter";
import { usePropertiesStore } from "../store/usePropertiesStore";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/loading spinner/LoadingSpinner";

const Properties = () => {
  const { getAllPosts, properties, loading } = usePropertiesStore();

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  // console.log(properties);

  if (loading) {
    return <LoadingSpinner />; // Show spinner while loading
  }

  if (!properties) {
    return (
      <div className="text-center py-20 text-lg">Properties not found.</div>
    ); // Handle the case when no property is found
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex">
        {/* Filter on the left with fixed position, 40% width, and centered vertically */}
        <div className="w-[30%] fixed top-[50%] left-8 transform -translate-y-1/2 bg-white shadow-lg z-10">
          <Filter />
        </div>

        {/* Property cards on the right, taking the remaining 60% width */}
        <div className="ml-[35%] w-[60%] mt-6 sm:mt-0">
          <div className="grid grid-cols-1 gap-8 overflow-y-auto h-full">
            {/* Map through properties and pass to the Card component */}
            {properties &&
              properties.map((property) => (
                <Link to={`/single-post/${property.id}`} key={property.id}>
                  <Card property={property} />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
