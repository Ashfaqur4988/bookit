import { create } from "zustand";
import { apiRequest } from "../lib/apiRequest";
import toast from "react-hot-toast";

export const usePropertiesStore = create((set, get) => ({
  properties: null,
  property: null,
  loading: false,

  getAllPosts: async () => {
    set({ loading: true });

    try {
      const response = await apiRequest.get("/posts/");
      set({ loading: false, properties: response.data });
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
      set({ loading: false });
      toast.success("Post created successfully");
    } catch (error) {
      toast.error(
        error.response.data.message || "Something went wrong, in addPost"
      );
      set({ loading: false });
    }
  },
}));
