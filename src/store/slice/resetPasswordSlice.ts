import { AxiosInstance } from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { ResetPasswordProps, ResetPasswordState } from "@/types/types";

const initialState: ResetPasswordState = {
  isLoading: false,
  isError: null,
  resetPasswordStatus: "idle",
};

export const resetPassword = createAsyncThunk(
  "resetPassword/ResetPassword",
  async (credentials: ResetPasswordProps, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post("/resetPassword", credentials);
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
        state.resetPasswordStatus = "loading";
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isError = null;
        state.isLoading = false;
        state.resetPasswordStatus = "succeeded";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
        state.resetPasswordStatus = "failed";
      });
  },
});

export default resetPasswordSlice.reducer;
