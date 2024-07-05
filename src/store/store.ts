import { configureStore } from "@reduxjs/toolkit";
import availabilitySlice from "./slice/availabilitySlice";
import signupSlice from "./slice/signupSlice";
import loginSlice from "./slice/loginSlice";
import userSlice from "./slice/userSlice";

const store = configureStore({
  reducer: {
    availability: availabilitySlice,
    signup: signupSlice,
    login: loginSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
