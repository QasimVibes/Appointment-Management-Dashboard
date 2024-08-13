import { AxiosInstance } from "@/utils/instance/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { VerifyOtpProps, VerifyOtpState } from "@/types/types";

const initialState: VerifyOtpState = {
  isLoading: false,
  isError: null,
  verifyOtpStatus: "idle",
};

export const verifyOtp = createAsyncThunk(
  "verifyOtp/verifyOtp",
  async (credentials: VerifyOtpProps, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post("/verifyOtp", credentials);
      toast.success(response?.data?.message);
      return response?.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const verifyOtpSlice = createSlice({
  name: "verifyOtp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
        state.verifyOtpStatus = "loading";
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.isError = null;
        state.isLoading = false;
        state.verifyOtpStatus = "succeeded";
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
        state.verifyOtpStatus = "failed";
      });
  },
});

export default verifyOtpSlice.reducer;
