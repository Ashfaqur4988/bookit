import { create } from "zustand";
import { apiRequest } from "../lib/apiRequest";

export const useReviewsStore = create((set) => ({
  reviewsState: [],
  loading: false,

  addReview: async ({ rating, comment, postId }) => {
    set({ loading: true });
    try {
      const response = await apiRequest.post("/reviews/create-review", {
        rating,
        comment,
        postId,
      });
      // console.log(`from addReview: ${response.data}`);
      set((state) => ({
        reviewsState: [...state.reviewsState, response.data],
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      console.error(error);
    }
  },

  getPostReview: async (postId) => {
    set({ loading: true });
    try {
      const response = await apiRequest.get(
        `reviews/get-post-review/${postId}`
      );
      // console.log("get post review");
      // console.log(JSON.stringify(response.data));

      set({ reviewsState: response.data });
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      console.error(error);
    }
  },
}));
