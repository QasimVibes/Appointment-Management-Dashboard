import { AxiosInstance } from "@/utils/instance/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ForgotPasswordProps, ForgotPasswordState } from "@/types/types";

const initialState: ForgotPasswordState = {
  isLoading: false,
  isError: null,
  forgotPasswordStatus: "idle",
};

export const forgotPassword = createAsyncThunk(
  "forgotPassword/forgotPassword",
  async (email: ForgotPasswordProps, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post("/forgotPassword", email);
      return response?.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
        state.forgotPasswordStatus = "loading";
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isError = null;
        state.isLoading = false;
        state.forgotPasswordStatus = "succeeded";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
        state.forgotPasswordStatus = "failed";
      });
  },
});

export default forgotPasswordSlice.reducer;
