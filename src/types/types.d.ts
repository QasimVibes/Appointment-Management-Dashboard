export type SetAvailabilityProps = {
  startHour: string;
  endHour: string;
  days: string[];
  userId: string;
};

export type availabilityData = {
  startHour: string;
  endHour: string;
  days: string[];
  user: {
    fullname: string;
    email: string;
  };
};

export type AvailabilityState = {
  isLoading: boolean;
  isError: boolean;
  availabilityData: availabilityData | null;
};

export type SignupState = {
  error: null | string;
  signupStatus: "idle" | "loading" | "failed" | "succeeded";
};

export type LoginState = {
  loginStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

export type SignupProps = {
  email: string;
  fullname: string;
  username: string;
  password: string;
};

export type UserData = {
  fullname: string;
  welcomeMessage: string;
  language: string;
  dateFormat: string;
  timeFormat: string;
  country: string;
  timezone: string;
  id: string;
};
export type UserState = {
  isLoading: boolean;
  isError: boolean;
  userDetails: UserData | null;
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

export type GenerateICSState = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
};

export type Appointment = {
  name: string;
  email: string;
  description: string;
  hostName: string;
  start: Date;
  end: Date;
};

export type Time = {
  hours: number;
  minutes: number;
};

export type ButtonProps = {
  text?: string;
  onClick?;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
};

export type DropDownProps = {
  items: { text: string; link: string }[];
};

export type Event = {
  id: string;
  selectedDate: string;
  selectedTime: string;
  schedulerName: string;
};

export type EventListProps = {
  events: Event[];
  title: string;
};

export type InputProps = {
  id?: string;
  label?: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  labelClassName?: string;
  maxLength?: number;
  pattern?: string;
  inputMode?:
    | "search"
    | "email"
    | "tel"
    | "text"
    | "url"
    | "none"
    | "numeric"
    | "decimal";
  autoComplete?: string;
  required?: boolean;
  checked?:boolean
};

export type MeetingConfirmProps = {
  hostName: string | null;
  selectedTime: string | null;
  timezone: string | null;
  date: string | null;
};

export type NavbarProps = {
  url?: string;
};

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

export type ScheduledEventDetails = {
  name: string;
  email: string;
  message: string;
};

export type ScheduledEventHostData = {
  email: string | null;
  host: string | null;
  hostEmail: string | null;
  startingTime: string | null;
  endingTime: string | null;
  day: string | null;
  location: string | null;
};

export type ScheduledAppointmentData = {
  hostName: string;
  selectedTime: string;
  timezone: string;
  selectedDate: string;
};

export type SideBarProps = {
  isSidebarOpen: boolean;
  children: React.ReactNode;
};

export type AvailabilityProps = {
  days: string[];
  startingHours: string[];
  endingHours: string[];
};
