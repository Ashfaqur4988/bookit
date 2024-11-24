import { create } from "zustand";
import { apiRequest } from "../lib/apiRequest.js";
import toast from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: false,

  signup: async ({ username, email, password, confirmPassword }) => {
    set({ loading: true });

    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords do not match");
    }
    try {
      const response = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
        confirmPassword,
      });
      set({ loading: false, user: response.data });
      toast.success("Signed up successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message || "Something went wrong, in signup"
      );
      console.error(error);
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true });
    try {
      const response = await apiRequest.post("/auth/login", {
        email,
        password,
      });
      set({ loading: false, user: response.data });
      toast.success("Logged in successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message || "Something went wrong, in login"
      );
      console.error(error);
    }
  },

  logout: async () => {
    try {
      await apiRequest.post("/auth/logout");
      set({ user: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response.data.message || "Something went wrong, in logout"
      );
    }
  },

  updateUser: async ({
    username,
    email,
    oldPassword,
    newPassword,
    profilePicture,
  }) => {
    set({ loading: true });
    try {
      const response = await apiRequest.put("/users/update-user", {
        username,
        email,
        oldPassword,
        newPassword,
        profilePicture,
      });
      set({ loading: false, user: response.data });
      toast.success("User updated successfully");
    } catch (error) {
      toast.error(
        error.response.data.message || "Something went wrong, in updateUser"
      );
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true, loading: true });
    try {
      const response = await apiRequest.get("/auth/get-user");
      set({ checkingAuth: false, user: response.data, loading: false });
    } catch (error) {
      set({ checkingAuth: false, user: null, loading: false });
      console.error(error);
    }
  },

  refreshToken: async () => {
    if (get().checkingAuth) return;
    try {
      const response = await apiRequest.get("/auth/refresh-token");
      set({ checkingAuth: false });
      return response.data;
    } catch (error) {
      set({ checkingAuth: false, user: null });
      throw error;
    }
  },

  //TODO: implement the axios interceptors for refreshing the access token
}));
