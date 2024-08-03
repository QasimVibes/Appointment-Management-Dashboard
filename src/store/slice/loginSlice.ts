import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signIn } from "next-auth/react";
import { LoginState } from "@/types/types";

const initialState: LoginState = {
  loginStatus: "idle",
  error: null,
};

export const loginWithEmail = createAsyncThunk(
  "auth/loginWithEmail",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await signIn("credentials", {
        ...credentials,
        redirect: false,
      });
      if (response?.ok) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response?.error);
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || "Login failed");
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
      console.error("Error during login with Google:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearLoginDetails: (state) => {
      state.loginStatus = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithEmail.pending, (state) => {
        state.loginStatus = "loading";
        state.error = null;
      })
      .addCase(loginWithEmail.fulfilled, (state) => {
        state.loginStatus = "succeeded";
        state.error = null;
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.error = action.payload as string;
      });
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.loginStatus = "loading";
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state) => {
        state.loginStatus = "succeeded";
        state.error = null;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { clearLoginDetails } = loginSlice.actions;
export default loginSlice.reducer;
