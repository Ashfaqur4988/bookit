import { useEffect, useState } from "react";
import Card from "../components/card/Card";
import Filter from "../components/filter/Filter";
import { usePropertiesStore } from "../store/usePropertiesStore";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/loading spinner/LoadingSpinner";

const Properties = () => {
  const { getAllPosts, properties, loading, totalPages } = usePropertiesStore();
  const [page, setPage] = useState(1); // State to track current page

  useEffect(() => {
    getAllPosts({ page, limit: 10 }); // Call API with page and limit
  }, [getAllPosts, page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex">
        <div className="w-[30%] fixed top-[50%] left-8 transform -translate-y-1/2 bg-white shadow-lg z-10">
          <Filter />
        </div>

        <div className="ml-[35%] w-[60%] mt-6 sm:mt-0 mb-4">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 gap-8 overflow-y-auto h-full">
              {!properties || properties.length === 0 ? (
                <div className="text-center py-20 text-lg">
                  Properties not found.
                </div>
              ) : (
                properties.map((property) => (
                  <Link to={`/single-post/${property.id}`} key={property.id}>
                    <Card property={property} />
                  </Link>
                ))
              )}
            </div>
          )}

          {!properties ||
            (properties.length === 0 ? null : (
              <div className="flex justify-center">
                <button
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className="px-4 py-2 bg-gray-200 rounded-lg mr-2 disabled:opacity-50"
                >
                  Previous
                </button>

                <span className="px-4 py-2">
                  Page {page} of {totalPages}
                </span>

                <button
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-gray-200 rounded-lg ml-2 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Properties;
