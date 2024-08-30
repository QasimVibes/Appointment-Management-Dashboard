import { UserState, UserData } from "@/types/types";
import { AxiosInstance } from "@/utils/instance/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  isLoading: true,
  isError: false,
  userDetails: null,
};

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data: UserData, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.put("/user", data);
      if (response?.data) {
        return response?.data;
      } else {
        return rejectWithValue(response?.data);
      }
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (userId: string | undefined, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get("/user", {
        params: { userId },
      });
      if (response?.data) {
        return response?.data?.user;
      } else {
        return rejectWithValue("Failed to fetch user details");
      }
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || "An error occurred");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userDetails = action.payload;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userDetails = action.payload;
      })
      .addCase(getUserDetails.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default userSlice.reducer;
