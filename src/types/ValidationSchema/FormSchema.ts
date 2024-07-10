import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const signupSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  fullname: z
    .string()
    .min(3, { message: "Fullname must be at least 3 characters" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export const otpSchema = z.object({
  otp: z.string().min(4, { message: "OTP must be at least 4 characters" }),
});

export const resetPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const timeFormat = z
  .string()
  .regex(/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/, "Invalid time format");
export const availabilitySchema = z.object({
  startHour: timeFormat.nonempty("Start hour is required"),
  endHour: timeFormat.nonempty("End hour is required"),
  selectedDays: z.array(z.string()).min(1, "At least one day must be selected"),
});

export const scheduledEventSchema = z.object({
  schedulerEmail: z
    .string()
    .email({ message: "Please enter a valid email address" }),
  schedulerName: z.string().nonempty("Name is required"),
  description: z.string().optional(),
  selectedTime: z.string().nonempty("Time is required"),
  selectedDate: z.string().nonempty("Date is required"),
  hostName: z.string().nonempty("Host name is required"),
  userId: z.string().nonempty("User id is required"),
});