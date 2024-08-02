import { configureStore } from "@reduxjs/toolkit";
import availabilitySlice from "./slice/availabilitySlice";
import signupSlice from "./slice/signupSlice";
import loginSlice from "./slice/loginSlice";
import userSlice from "./slice/userSlice";
import scheduledEventSlice from "./slice/scheduledEventSlice";
import forgotPasswordSlice from "./slice/forgotPasswordSlice";
import verifyOtpSlice from "./slice/verifyOtpSlice";
import resetPasswordSlice from "./slice/resetPasswordSlice";
import icsSlice from "./slice/generateIcsFileSlice";
import analyticsSlice from "./slice/analyticsSlice";

const store = configureStore({
  reducer: {
    availability: availabilitySlice,
    signup: signupSlice,
    login: loginSlice,
    user: userSlice,
    scheduledEvent: scheduledEventSlice,
    forgotPassword: forgotPasswordSlice,
    verifyOtp: verifyOtpSlice,
    resetPassword: resetPasswordSlice,
    ics: icsSlice,
    analytics: analyticsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
