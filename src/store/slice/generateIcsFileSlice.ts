import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { AxiosInstance } from "@/utils/axiosInstance";
import { GenerateICSState } from "@/types/types";

const initialState: GenerateICSState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const generateICSFile = createAsyncThunk(
  "ics/generateICSFile",
  async (userId: string | undefined, { rejectWithValue }) => {
    try {
      const response = await AxiosInstance.post(
        "/generateICS",
        { userId },
        { responseType: "blob" }
      );

      if (response.data) {
        const blob = new Blob([response.data], { type: "text/calendar" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "appointment.ics";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        toast.success("ICS file generated successfully");
        return { success: true };
      } else {
        toast.error(response.data.message);
        return rejectWithValue(response.data);
      }
    } catch (error: any) {
      toast.error("Error generating ICS file");
      return rejectWithValue(error);
    }
  }
);

export const icsSlice = createSlice({
  name: "ics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generateICSFile.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(generateICSFile.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(generateICSFile.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      });
  },
});

export default icsSlice.reducer;
