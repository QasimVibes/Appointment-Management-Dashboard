import { AxiosInstance } from "@/utils/instance/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { AnalyticsState, PeakHoursAnalyticsData } from "@/types/types";

const initialState: AnalyticsState = {
  isLoading: true,
  isError: false,
  analyticsData: null,
};

export const putPeakHoursAnalyticsData = createAsyncThunk(
  "analytics/putPeakHoursAnalyticsData",
  async (
    { userId, url, durationInMinutes }: PeakHoursAnalyticsData,
    { rejectWithValue }
  ) => {
    try {
      const response = await AxiosInstance.put("/appointmentStats", {
        userId,
        url,
        durationInMinutes,
      });
      if (response?.data) {
        return response?.data;
      } else {
        toast.error(response?.data?.message);
        return rejectWithValue(response?.data?.message);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchAnalyticsData = createAsyncThunk(
  "analytics/fetchAnalyticsData",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get("/appointmentStats", {
        params: { userId },
      });
      if (response?.data) {
        return response?.data;
      } else {
        toast.error(response?.data?.message);
        return rejectWithValue(response?.data?.message);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalyticsData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchAnalyticsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.analyticsData = action.payload;
      })
      .addCase(fetchAnalyticsData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

    builder
      .addCase(putPeakHoursAnalyticsData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(putPeakHoursAnalyticsData.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(putPeakHoursAnalyticsData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default analyticsSlice.reducer;
