/* eslint-disable react/prop-types */

const ReviewCard = ({ commentUser, comment, rating }) => {
  // if (loading) return <div>Loading...</div>;

  return (
    <div className="mb-2 px-4 py-2 bg-gray-100 rounded-lg">
      <div className="flex gap-2 items-center mb-2">
        <img
          src={
            commentUser.profilePicture
              ? commentUser.profilePicture
              : "/noavatar.jpg"
          }
          alt={commentUser.username || "Anonymous"}
          className="w-10 h-10 rounded-full"
        />
        <h4 className="font-bold text-md">
          {commentUser.username || "Anonymous"}
        </h4>
      </div>
      <div className="flex gap-2">
        <p className="text-yellow-500 mb-2">⭐ {rating}</p>
        <p>{comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
