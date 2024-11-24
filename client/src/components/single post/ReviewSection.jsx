/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import ReviewCard from "./ReviewCard";
import { useReviewsStore } from "../../store/useReviewStore";

const ReviewSection = ({ postId }) => {
  const { reviewsState, addReview, getPostReview } = useReviewsStore();
  const latestCommentRef = useRef(null);

  useEffect(() => {
    getPostReview(postId);
  }, [getPostReview, postId]);

  useEffect(() => {
    if (latestCommentRef.current) {
      latestCommentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [reviewsState]);

  const [formData, setFormData] = useState({
    rating: 0,
    comment: "",
    postId,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview(formData);
    setFormData({ rating: 0, comment: "", postId });
  };

  // Filter reviews based on the current `postId`
  const filteredReviews = reviewsState.filter(
    (review) => review.postId === postId
  );

  return (
    <div className="w-full lg:w-2/5 h-fit bg-white p-6 rounded-lg shadow-lg relative">
      <h2 className="text-xl font-semibold mb-4">Reviews</h2>
      <div className="mb-4 shadow overflow-y-scroll max-h-72">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review, index) => (
            <div
              key={review.id}
              ref={
                index === filteredReviews.length - 1 ? latestCommentRef : null
              }
            >
              <ReviewCard
                comment={review.comment}
                id={review.id}
                rating={review.rating}
                commentUser={review.user}
              />
            </div>
          ))
        ) : (
          <p>No reviews yet. Add a review!</p>
        )}
      </div>
      <form
        className="flex items-start justify-between gap-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-1/5">
          <select
            className="select select-bordered w-full mb-2"
            value={formData.rating}
            onChange={(e) =>
              setFormData({ ...formData, rating: e.target.value })
            }
          >
            <option value={5}>5 ⭐</option>
            <option value={4}>4 ⭐</option>
            <option value={3}>3 ⭐</option>
            <option value={2}>2 ⭐</option>
            <option value={1}>1 ⭐</option>
          </select>
        </div>
        <div className="flex flex-col w-4/5">
          <textarea
            className="textarea textarea-bordered w-full mb-2"
            placeholder="Write your review..."
            value={formData.comment}
            onChange={(e) =>
              setFormData({ ...formData, comment: e.target.value })
            }
          ></textarea>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default ReviewSection;
