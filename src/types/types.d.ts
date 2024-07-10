export type SetAvailabilityProps = {
  startHour: string;
  endHour: string;
  days: string[];
  userId: string;
};

export type AvailabilityState = {
  isLoading: boolean;
  isError: boolean;
};

export type SignupState = {
  error: null | string;
  signupStatus: "idle" | "loading" | "failed" | "succeeded";
  userDetails: {};
};

export type LoginState = {
  loginStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  userDetails: {} | null;
};

export type SignupProps = {
  email: string;
  fullname: string;
  username: string;
  password: string;
};

export type UserState = {
  isLoading: boolean;
  isError: boolean;
  userDetails: string[] | null;
};

export type ScheduledEventState = {
  isLoading: boolean;
  isError: boolean;
  scheduledEventStatus: "idle" | "loading" | "succeeded" | "failed";
};

export type ForgotPasswordProps = {
  email: string;
};
export type ForgotPasswordState = {
  isLoading: boolean;
  isError: string | null;
  forgotPasswordStatus: "idle" | "loading" | "succeeded" | "failed";
};

export type VerifyOtpProps = {
  email: string;
  otp: string;
};

export type VerifyOtpState = {
  isLoading: boolean;
  isError: string | null;
  verifyOtpStatus: "idle" | "loading" | "succeeded" | "failed";
};

export type ResetPasswordProps = {
  email: string;
  otp: string;
  newPassword: string;
};

export type ResetPasswordState = {
  isLoading: boolean;
  isError: string | null;
  resetPasswordStatus: "idle" | "loading" | "succeeded" | "failed";
};

export type Appointment = {
  name: string;
  email: string;
  description: string;
  hostName: string;
  start: Date;
  end: Date;
};
