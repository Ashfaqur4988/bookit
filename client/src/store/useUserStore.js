import { create } from "zustand";
import { apiRequest } from "../lib/apiRequest.js";
import toast from "react-hot-toast";
import axios from "axios";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

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
      set({ user: null });
      await apiRequest.post("/auth/logout");
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
    set({ checkingAuth: true });
    try {
      const response = await apiRequest.get("/auth/get-user");
      set({ checkingAuth: false, user: response.data });
    } catch (error) {
      set({ checkingAuth: false, user: null });
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
}));

let refreshPromise = null; // Keeps track of whether we're refreshing a token

axios.interceptors.response.use(
  (response) => response, // If the response is good, just return it.
  async (error) => {
    // If the response is an error, handle it here.
    const originalRequest = error.config; // Save the original request so we can retry it later.

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request so we don't retry it again.

      try {
        if (refreshPromise) {
          // If someone else is already refreshing the token, wait for them.
          await refreshPromise;
          return axios(originalRequest); // Once it's ready, retry the request.
        }

        // Start a new token refresh process.
        refreshPromise = useUserStore.getState().refreshToken();
        await refreshPromise;
        refreshPromise = null; // Reset so other requests can trigger a new refresh if needed.

        return axios(originalRequest); // Retry the failed request with the new token.
      } catch (refreshError) {
        // If the token refresh fails, log the user out and send back an error.
        useUserStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    // If it's not a 401 error, just pass the error to be handled elsewhere.
    return Promise.reject(error);
  }
);
