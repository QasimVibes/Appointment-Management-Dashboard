import { AxiosInstance } from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { SignupState, SignupProps } from "@/types/types";
import { AxiosResponse } from "axios";

const initialState: SignupState = {
  error: null,
  signupStatus: "idle",
  userDetails: {},
};

export const signupUser = createAsyncThunk(
  "signup/signupUser",
  async (data: SignupProps, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post("/signup", data);
      toast.success(response.data.message);
      return response.data;
    } catch (error: AxiosResponse | any) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    clearSignupDetails: (state) => {
      state.userDetails = {};
      state.error = null;
      state.signupStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.error = null;
        state.signupStatus = "loading";
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.error = null;
        state.signupStatus = "succeeded";
        state.userDetails = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.signupStatus = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { clearSignupDetails } = signupSlice.actions;
export default signupSlice.reducer;
