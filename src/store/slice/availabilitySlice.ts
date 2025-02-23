import { AxiosInstance } from "@/utils/instance/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { SetAvailabilityProps, AvailabilityState } from "@/types/types";

const initialState: AvailabilityState = {
  isLoading: true,
  isError: false,
  availabilityData: null,
};

export const setAvailability = createAsyncThunk(
  "availability/setAvailability",
  async (
    { startHour, endHour, days, userId }: SetAvailabilityProps,
    { rejectWithValue }
  ) => {
    try {
      const response = await AxiosInstance.put("/availability", {
        startHour,
        endHour,
        days,
        userId,
      });

      if (response?.data) {
        toast.success(response?.data?.message);
        return response?.data;
      } else {
        toast.error(response?.data?.message);
      }
      return rejectWithValue(response?.data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchAvailabilityData = createAsyncThunk(
  "availability/fetchAvailabilityData",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.get(`/availability`, {
        params: { userId },
      });

      if (response.status === 200) {
        return response?.data?.availability;
      } else {
        return rejectWithValue(
          `Request failed with status: ${response?.status}`
        );
      }
    } catch (error: any) {
      let errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Failed to fetch availability data.";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const availabilitySlice = createSlice({
  name: "availability",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setAvailability.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(setAvailability.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.availabilityData = action.payload;
      })
      .addCase(setAvailability.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });

    builder
      .addCase(fetchAvailabilityData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchAvailabilityData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.availabilityData = action.payload;
      })
      .addCase(fetchAvailabilityData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default availabilitySlice.reducer;
