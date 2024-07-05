import { UserState } from "@/types/types";
import { AxiosInstance } from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  isLoading: false,
  isError: false,
  user: {
    email: null,
    fullname: null,
  },
};

export const getUser = createAsyncThunk(
  "user/getUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get("/user", {
        params: { userId },
      });
      if (response?.data) {
        const user = {
          email: response.data.user.email,
          fullname: response.data.user.fullname,
        };
        return user;
      } else {
        throw new Error("User data not found");
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default userSlice.reducer;
