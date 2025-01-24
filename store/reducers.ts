import { createSlice } from "@reduxjs/toolkit";
import { fetchUsersData, updateUserData } from "@/store/action";
import { User } from "@/apis/interface/user";

interface UserState {
  data: User[];
  loading: boolean;
  error: string | null;
  refresher: boolean;
}

const initialState: UserState = {
  data: [],
  loading: false,
  error: null,
  refresher: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setRefresher: (state) => {
      state.refresher = !state.refresher;
    },
  },
  extraReducers: (builder) => {
    // Fetch
    builder.addCase(fetchUsersData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUsersData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchUsersData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch users.";
    });

    // Update
    builder.addCase(updateUserData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUserData.fulfilled, (state, action) => {
      const updatedUser = action.payload;
      state.data = state.data.map((user) =>
        user.id === updatedUser.documentId ? updatedUser : user
      );
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateUserData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to update user.";
    });
  },
});

export const { setRefresher } = userSlice.actions;
export const { clearError } = userSlice.actions;
export default userSlice.reducer;
