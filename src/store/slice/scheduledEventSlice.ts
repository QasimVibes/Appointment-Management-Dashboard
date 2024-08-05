import { AxiosInstance } from "@/utils/instance/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { ScheduledEventState, AppointmentSlice } from "@/types/types";

const initialState: ScheduledEventState = {
  isLoading: false,
  isError: false,
  scheduledEventStatus: "idle",
};

export const setScheduledEvent = createAsyncThunk(
  "scheduledEvent/setScheduledEvent",
  async (data: AppointmentSlice, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post("/meeting", data);
      if (response?.data) {
        toast.success(response.data.message);
        return response.data.meeting;
      } else {
        toast.error(response.data.message);
      }
      return rejectWithValue(response.data);
    } catch (error: any) {
      toast.error(error.response.data.message);
      return rejectWithValue(error);
    }
  }
);

export const fetchMeeting = createAsyncThunk(
  "scheduledEvent/fetchMeeting",
  async (
    { userId, url }: { userId?: string; url?: string },
    { rejectWithValue }
  ) => {
    try {
      const queryString = userId
        ? `?userId=${userId}`
        : url
        ? `?url=${url}`
        : "";
      const response = await AxiosInstance.get(`/meeting${queryString}`);

      if (response?.data) {
        return response.data;
      } else {
        toast.error(response.data.message);
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
      .addCase(setScheduledEvent.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.scheduledEventStatus = "succeeded";
      })
      .addCase(setScheduledEvent.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.scheduledEventStatus = "failed";
      });

    builder
      .addCase(fetchMeeting.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.scheduledEventStatus = "loading";
      })
      .addCase(fetchMeeting.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.scheduledEventStatus = "succeeded";
      })
      .addCase(fetchMeeting.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.scheduledEventStatus = "failed";
      });
  },
});

export default scheduledEventSlice.reducer;
