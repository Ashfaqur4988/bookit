import React, { useEffect } from "react";
import LoadingSpinner from "../components/loading spinner/LoadingSpinner";
import ProfilePicture from "../components/profile/ProfilePicture";
import SavedPosts from "../components/profile/SavedPosts";
import UserInfo from "../components/profile/UserInfo";
import UserPosts from "../components/profile/UserPosts";
import { useUserStore } from "../store/useUserStore";

const ProfilePage = () => {
  const { user, loading, checkAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return <LoadingSpinner />; // Show spinner while loading
  }

  if (!user) {
    return (
      <div className="text-center py-20 text-lg">
        Unable to fetch user data.
      </div>
    ); // Handle the case when no property is found
  }

  console.log("profile page");
  return (
    <div className="container mx-auto p-6">
      <div className="text-center">
        <ProfilePicture profileImage={user.profilePicture || "/noavatar.jpg"} />
        <UserInfo name={user.username} />
      </div>
      <div className="mt-10 flex justify-around  gap-4">
        <UserPosts userPosts={user.posts} />
        <SavedPosts savedPosts={user.savedPosts} />
      </div>
    </div>
  );
};

export default React.memo(ProfilePage);
