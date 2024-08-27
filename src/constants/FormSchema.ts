import {
  AvailabilityData,
  ForgotPasswordData,
  LoginData,
  OTPData,
  PasswordResetData,
  ProfileData,
  ScheduledEventData,
  SignupData,
  ValidationErrorsAvailability,
  ValidationErrorsForgotPassword,
  ValidationErrorsLogin,
  ValidationErrorsOTP,
  ValidationErrorsPasswordReset,
  ValidationErrorsProfile,
  ValidationErrorsScheduledEvent,
  ValidationErrorsSignup,
} from "@/types/types";

export const validateLoginData = (data: LoginData): ValidationErrorsLogin => {
  const errors: ValidationErrorsLogin = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (data.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }
  return errors;
};

export const validateSignupData = (
  data: SignupData
): ValidationErrorsSignup => {
  const errors: ValidationErrorsSignup = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (data.fullname.length < 3) {
    errors.fullname = "Fullname must be at least 3 characters";
  }

  if (data.username.length < 3) {
    errors.username = "Username must be at least 3 characters";
  }

  if (data.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  return errors;
};

export const validateForgotPasswordData = (
  data: ForgotPasswordData
): ValidationErrorsForgotPassword => {
  const errors: ValidationErrorsForgotPassword = {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  return errors;
};

export const validateOTPData = (data: OTPData): ValidationErrorsOTP => {
  const errors: ValidationErrorsOTP = {};
  if (data.otp.length < 4) {
    errors.otp = "OTP must be at least 4 characters";
  }

  return errors;
};

export const validatePasswordResetData = (
  data: PasswordResetData
): ValidationErrorsPasswordReset => {
  const errors: ValidationErrorsPasswordReset = {};

  if (data.newPassword.length < 8) {
    errors.newPassword = "Password must be at least 8 characters";
  }
  if (data.confirmPassword.length < 8) {
    errors.confirmPassword = "Password must be at least 8 characters";
  }

  if (data.newPassword !== data.confirmPassword) {
    errors.mismatch = "Passwords do not match";
  }

  return errors;
};

export const validateAvailabilityData = (
  data: AvailabilityData
): ValidationErrorsAvailability => {
  const errors: ValidationErrorsAvailability = {};
  const timeFormatRegex = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;

  if (!timeFormatRegex.test(data.startHour)) {
    errors.startHour = "Invalid time format";
  }

  if (!timeFormatRegex.test(data.endHour)) {
    errors.endHour = "Invalid time format";
  }

  if (!data.startHour.trim()) {
    errors.startHour = "Start hour is required";
  }

  if (!data.endHour.trim()) {
    errors.endHour = "End hour is required";
  }

  if (data.selectedDays.length === 0) {
    errors.selectedDays = "At least one day must be selected";
  }

  return errors;
};

export const validateScheduledEventData = (
  data: ScheduledEventData
): ValidationErrorsScheduledEvent => {
  const errors: ValidationErrorsScheduledEvent = {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(data.schedulerEmail)) {
    errors.schedulerEmail = "Please enter a valid email address";
  }

  if (!data.schedulerName.trim()) {
    errors.schedulerName = "Name is required";
  }

  if (!data.selectedTime.trim()) {
    errors.selectedTime = "Time is required";
  }

  if (!data.selectedDate || !data.selectedDate.trim()) {
    errors.selectedDate = "Date is required";
  }

  if (data.hostName && !data.hostName.trim()) {
    errors.hostName = "Host name is required";
  }

  if (data.hostEmail && !emailRegex.test(data.hostEmail)) {
    errors.hostEmail = "Please enter a valid email address";
  }

  if (data.userId === undefined || !data.userId.trim()) {
    errors.userId = "User id is required";
  }

  if (data.timezone && !data.timezone.trim()) {
    errors.timezone = "Timezone is required";
  }

  return errors;
};

export const validateProfileData = (
  data: ProfileData
): ValidationErrorsProfile => {
  const errors: ValidationErrorsProfile = {};

  if (!data.id.trim()) {
    errors.id = "ID is required";
  }

  if (!data.fullname.trim()) {
    errors.fullname = "Fullname is required";
  }

  return errors;
};
