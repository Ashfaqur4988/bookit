import { create } from "zustand";
import { apiRequest } from "../lib/apiRequest";
import toast from "react-hot-toast";

export const usePropertiesStore = create((set) => ({
  properties: [],
  property: null,
  loading: false,
  totalPosts: 0,
  totalPages: 0,
  currentPage: 1,

  getAllPosts: async (query) => {
    set({ loading: true });
    try {
      const response = await apiRequest.get("/posts/", {
        params: query,
      });
      set({
        loading: false,
        properties: response.data.posts,
        totalPosts: response.data.totalPosts,
        totalPages: response.data.totalPages,
        currentPage: query.page || 1,
      });
    } catch (error) {
      set({ loading: false });
      console.error(error);
    }
  },

  getSinglePost: async (id) => {
    set({ loading: true });
    try {
      const response = await apiRequest.get(`/posts/${id}`);
      set({ loading: false, property: response.data });
      console.log(response.data);
    } catch (error) {
      set({ loading: false });
      console.error(error);
    }
  },

  createPost: async ({ postData, postDetail }) => {
    // console.log({ postData, postDetail });
    set({ loading: true });
    try {
      const response = await apiRequest.post("/posts/", {
        postData,
        postDetail,
      });
      // console.log({ res: response.data });
      set({ loading: false, property: response.data });
      toast.success("Post created successfully");
    } catch (error) {
      toast.error(
        error.response.data.message || "Something went wrong, in addPost"
      );
      set({ loading: false });
    }
  },

  deletePost: async (id) => {
    set({ loading: true });
    try {
      const response = await apiRequest.delete(`/posts/${id}`);
      toast.success(response.data.message);
      set({ loading: false });
    } catch (error) {
      toast.error(
        error.response.data.message || "Something went wrong in delete post"
      );
      set({ loading: false });
    }
  },
}));
