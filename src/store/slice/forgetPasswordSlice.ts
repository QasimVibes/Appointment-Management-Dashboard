import { AxiosInstance } from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { ForgetPasswordProps, ForgetPasswordState } from "@/types/types";

const initialState: ForgetPasswordState = {
  isLoading: false,
  isError: null,
  forgetPasswordStatus: "idle",
};

export const forgetPassword = createAsyncThunk(
  "forgetPassword/forgetPassword",
  async (email: ForgetPasswordProps, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post("/forgetPassword", email);
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const forgetPasswordSlice = createSlice({
  name: "forgetPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgetPassword.pending, (state) => {
        state.isError = null;
        state.isLoading = true;
        state.forgetPasswordStatus = "loading";
      })
      .addCase(forgetPassword.fulfilled, (state) => {
        state.isError = null;
        state.isLoading = false;
        state.forgetPasswordStatus = "succeeded";
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
        state.forgetPasswordStatus = "failed";
      });
  },
});


export default forgetPasswordSlice.reducer;