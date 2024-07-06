import { AxiosInstance } from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


// Later on correct for pending ideal 
const initialState = {
  isLoading: false,
  isError: false,
  data: null,
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
      })
      .addCase(setScheduledEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(setScheduledEvent.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default scheduledEventSlice.reducer;
