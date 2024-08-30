import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signIn } from "next-auth/react";
import { AxiosInstance } from "@/utils/instance/axiosInstance";
import { SignupProps, AuthState } from "@/types/types";

const initialState: AuthState = {
  loginStatus: "idle",
  signupStatus: "idle",
  error: null,
  isLoadingWithEmail: false,
  isLoadingWithGoogle: false,
  isLoading: false,
};

export const loginWithEmail = createAsyncThunk(
  "auth/loginWithEmail",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    const response = await signIn("credentials", {
      ...credentials,
      redirect: false,
    });
    if (response?.ok) {
      return response;
    } else {
      return thunkAPI.rejectWithValue(response?.error || "Login failed");
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (_, thunkAPI) => {
    try {
      const response = await signIn("google", { redirect: false });
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (data: SignupProps, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post("/signup", data);
      return response?.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearDetails: (state) => {
      state.loginStatus = "idle";
      state.signupStatus = "idle";
      state.error = null;
      state.isLoadingWithEmail = false;
      state.isLoadingWithGoogle = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithEmail.pending, (state) => {
        state.loginStatus = "loading";
        state.error = null;
        state.isLoadingWithEmail = true;
      })
      .addCase(loginWithEmail.fulfilled, (state) => {
        state.loginStatus = "succeeded";
        state.error = null;
        state.isLoadingWithEmail = false;
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.error = action.payload as string;
        state.isLoadingWithEmail = false;
      });

    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.loginStatus = "loading";
        state.error = null;
        state.isLoadingWithGoogle = true;
      })
      .addCase(loginWithGoogle.fulfilled, (state) => {
        state.loginStatus = "succeeded";
        state.error = null;
        state.isLoadingWithGoogle = false;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.error = action.payload as string;
        state.isLoadingWithGoogle = false;
      });

    builder
      .addCase(signupUser.pending, (state) => {
        state.error = null;
        state.signupStatus = "loading";
        state.isLoading = true;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.error = null;
        state.signupStatus = "succeeded";
        state.isLoading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.signupStatus = "failed";
        state.error = action.payload as string;
        state.isLoading = false;
      });
  },
});

export const { clearDetails } = authSlice.actions;

export default authSlice.reducer;
