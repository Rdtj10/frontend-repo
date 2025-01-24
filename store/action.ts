import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/apis/userApi";

//fetch
export const fetchUsersData = createAsyncThunk(
  "users/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/fetch-data");
      const data = response.data;

      const usersWithId = data.map((doc: any) => ({
        ...doc,
        id: doc.id, 
      }));

      console.log("Fetched Data:", usersWithId);
      return usersWithId;
    } catch (error: any) {
      console.error("Fetch Users Error:", error);

      if (error.response?.status === 401) {
        return rejectWithValue("Unauthorized: Please log in to access the data.");
      }
    }
  }
);


//update
export const updateUserData = createAsyncThunk(
  "users/update",
  async (
    { data, documentId }: { data: any; documentId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(`/update-data/${documentId}`, data);

      console.log("Updated Data:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Update User Error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
