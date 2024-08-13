import { configureStore } from "@reduxjs/toolkit";
import availabilitySlice from "./slice/availabilitySlice";
import userSlice from "./slice/userSlice";
import scheduledEventSlice from "./slice/scheduledEventSlice";
import forgotPasswordSlice from "./slice/forgotPasswordSlice";
import verifyOtpSlice from "./slice/verifyOtpSlice";
import resetPasswordSlice from "./slice/resetPasswordSlice";
import icsSlice from "./slice/generateIcsFileSlice";
import analyticsSlice from "./slice/analyticsSlice";
import authSlice from "./slice/authSlice";

const store = configureStore({
  reducer: {
    availability: availabilitySlice,
    user: userSlice,
    scheduledEvent: scheduledEventSlice,
    forgotPassword: forgotPasswordSlice,
    verifyOtp: verifyOtpSlice,
    resetPassword: resetPasswordSlice,
    ics: icsSlice,
    analytics: analyticsSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
