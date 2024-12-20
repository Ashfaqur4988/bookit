import React, { useCallback, useEffect, useState } from "react";
import Card from "../components/card/Card";
import Filter from "../components/filter/Filter";
import { usePropertiesStore } from "../store/usePropertiesStore";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/loading spinner/LoadingSpinner";
import Pagination from "../components/pagination/Pagination";

const Properties = () => {
  const { getAllPosts, properties, loading, totalPages } = usePropertiesStore();
  const [page, setPage] = useState(1); // State to track current page

  // Function to fetch properties & optimized it so that it do not get created on every render
  const fetchProperties = useCallback(() => {
    getAllPosts({ page, limit: 10 });
  }, [getAllPosts, page]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  //next page function also memoized for optimization
  const handleNextPage = useCallback(() => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [page, totalPages]);

  //prev page function also memoized for optimization
  const handlePrevPage = useCallback(() => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  }, [page]);

  //this avoids creating a new map function on every render, reducing React’s reconciliation work.
  const renderProperties = useCallback(() => {
    if (!properties || properties.length === 0) {
      return (
        <div className="text-center py-20 text-lg">Properties not found.</div>
      );
    }
    return properties.map((property) => (
      <Link to={`/single-post/${property.id}`} key={property.id}>
        <Card property={property} />
      </Link>
    ));
  }, [properties]);

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
              {renderProperties()}
            </div>
          )}

          {!properties ||
            (properties.length === 0 ? null : (
              <Pagination
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                page={page}
                totalPages={totalPages}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Properties);
