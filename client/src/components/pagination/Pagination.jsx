/* eslint-disable react/prop-types */
import React from "react";

const Pagination = ({ handleNextPage, handlePrevPage, page, totalPages }) => {
  return (
    <>
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
    </>
  );
};

export default React.memo(Pagination);
