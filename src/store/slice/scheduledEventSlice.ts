import { AxiosInstance } from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { ScheduledEventState } from "@/types/types";

const initialState:ScheduledEventState = {
  isLoading: false,
  isError: false,
  scheduledEventStatus: "idle",
};

export const setScheduledEvent = createAsyncThunk(
  "scheduledEvent/setScheduledEvent",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post("/meeting", data);

      if (response?.data) {
        toast.success(response.data.message);
        return response.data;
      }
      return rejectWithValue(response.data);
    } catch (error: any) {
      toast.error(error.response.data.message);
      return rejectWithValue(error);
    }
  }
);

export const scheduledEventSlice = createSlice({
  name: "scheduledEvent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setScheduledEvent.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.scheduledEventStatus = "loading";
      })
      .addCase(setScheduledEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.scheduledEventStatus = "succeeded";
      })
      .addCase(setScheduledEvent.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.scheduledEventStatus = "failed";
      });
  },
});

export default scheduledEventSlice.reducer;
