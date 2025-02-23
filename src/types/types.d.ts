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

export type AnalyticsData = {
  date: Date;
  visits: number;
  scheduledCount: number;
  peakHours?: number[];
};

export type AnalyticsState = {
  isLoading: boolean;
  isError: boolean;
  analyticsData: AnalyticsData | null;
};

export type PeakHoursAnalyticsData = {
  userId: string;
  url: string;
  durationInMinutes: number;
};

export type AuthState = {
  loginStatus: "idle" | "loading" | "succeeded" | "failed";
  signupStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  isLoadingWithEmail: boolean;
  isLoadingWithGoogle: boolean;
  isLoading: boolean;
};

export type SignupProps = {
  email: string;
  fullname: string;
  username: string;
  password: string;
  [key: string]: string;
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
  meeting: ScheduledAppointmentData | null;
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
  isLoading?: boolean;
};

export type DropDownProps = {
  items: { text: string; link: string }[];
};

export type Event = {
  id: string;
  selectedDate: string;
  selectedTime: string;
  schedulerName: string;
  url: string;
};

export type EventListProps = {
  events: Event[];
  title: string;
};

export type InputProps = {
  id?: string;
  label?: string;
  type: string;
  name?: string;
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
  checked?: boolean;
};

export type NavbarProps = {
  url?: string;
};

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectProps = {
  options: SelectOption[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  optionText?: string;
  name?: string;
  id?: string;
};

export type ScheduledEventDetails = {
  name: string;
  email: string;
  message: string;
  [key: string]: string;
};

export type ScheduledEventHostData = {
  host: string | null;
  hostEmail: string | null;
  startingTime: string | null;
  endingTime: string | null;
  day: string | null;
  location: string | null;
};

export type ScheduledAppointmentData = {
  hostName: string | null;
  selectedTime: string | null;
  timezone: string | null;
  selectedDate: string | null;
  meetingLink: string | null;
  url: string | null;
  userId: string | null;
};

export type SideBarProps = {
  isSidebarOpen: boolean;
  children: React.ReactNode;
};

export type LocationsOption = {
  value: string;
  label: string;
};

export type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type AvailabilityDataParam = {
  user: {
    fullname: string;
    email: string;
  };
  days: string[];
  time: string;
  time?: string;
};

export type AvailabilityDataSlice = {
  startHour: string;
  endHour: string;
  days: string[];
  userId: string;
};

export type LabelProps = {
  htmlFor: string;
  label: string;
  className?: string;
  [key: string]: string | undefined | Record<string, unknown>;
};

export type TextAreaProps = {
  name: string;
  id: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  className?: string;
};

export type LogoProps = {
  width: number;
  height: number;
  className?: string;
};

export type UseWeeklyChartsProps = {
  analyticsData: AnalyticsData[] | null;
};

export type MeetingConfirmData = {
  person: string;
  hostName: string | null;
  selectedTime: string | null;
  selectedDate: string | null;
  timezone: string | null;
  briefcase: string;
  globe: string;
};

export type NextAuthSessionProviderProps = {
  children: React.ReactNode;
};

export type ReduxProviderProps = {
  children: React.ReactNode;
};

export type InputDetail = {
  id: string;
  label: string;
  type: string;
  value?: string;
  name: string;
};

export type Meeting = {
  id: string;
  schedulerEmail: string;
  schedulerName: string;
  description: string;
  selectedTime: string;
  selectedDate: string;
  hostName: string;
  timezone: string;
  url: string;
  meetingLink: string;
  userId: string;
  createdAt: Date;
  updateAt: Date;
};

export type AppointmentSlice = {
  schedulerEmail: string;
  schedulerName: string;
  description: string;
  selectedTime: string;
  selectedDate: string | null;
  hostName: string | null;
  hostEmail: string | null;
  timezone: string | null;
  userId: string | undefined;
};

export type ParamData = {
  host: string;
  hostEmail: string;
  startingTime: string;
  endingTime: string;
  day?: string;
  location: string;
};

type EventDateTime = {
  dateTime: string;
  timeZone: string;
};

type EventAttendee = {
  email: string;
};

type EventReminderOverride = {
  method: string;
  minutes: number;
};

type EventReminders = {
  useDefault: boolean;
  overrides?: EventReminderOverride[];
};

export type GoogleMeetEventDetails = {
  summary: string;
  description: string;
  start: EventDateTime;
  end: EventDateTime;
  conferenceRequestId: string;
  attendees: EventAttendee[];
  reminders: EventReminders;
};

export type NodemailerProps = {
  to: string;
  templateVariables: { [key: string]: string };
};

export type LogoutBtnProps = {
  text?: string;
  className?: string;
  children?: ReactNode;
};

export type InputFieldsResetPassword = {
  newPassword: string;
  confirmPassword: string;
  setNewPassword: Function;
  setConfirmPassword: Function;
};

export type ChartEventData = {
  weeklyVisitsData: number[];
  weeklyData: number[];
  weeklyPeakHoursData: number[];
};

export type LoginData = {
  email: string;
  password: string;
};

export type ValidationErrorsLogin = {
  email?: string;
  password?: string;
};

export type SignupData = {
  email: string;
  fullname: string;
  username: string;
  password: string;
};

export type ValidationErrorsSignup = {
  email?: string;
  fullname?: string;
  username?: string;
  password?: string;
};

export type ForgotPasswordData = {
  email: string;
};

export type ValidationErrorsForgotPassword = {
  email?: string;
};

export type OTPData = {
  otp: string;
};

export type ValidationErrorsOTP = {
  otp?: string;
};

export type PasswordResetData = {
  newPassword: string;
  confirmPassword: string;
};

export type ValidationErrorsPasswordReset = {
  newPassword?: string;
  confirmPassword?: string;
  mismatch?: string;
};

export type AvailabilityData = {
  startHour: string;
  endHour: string;
  selectedDays: string[];
};

export type ValidationErrorsAvailability = {
  startHour?: string;
  endHour?: string;
  selectedDays?: string;
};

export type ScheduledEventData = {
  schedulerEmail: string;
  schedulerName: string;
  description?: string;
  selectedTime: string;
  selectedDate: string | null;
  hostName: string | null;
  hostEmail: string | null;
  userId: string | undefined;
  timezone: string | null;
};

export type ValidationErrorsScheduledEvent = {
  schedulerEmail?: string;
  schedulerName?: string;
  description?: string;
  selectedTime?: string;
  selectedDate?: string;
  hostName?: string;
  hostEmail?: string;
  userId?: string;
  timezone?: string;
};

export type ProfileData = {
  fullname: string;
  welcomeMessage?: string;
  language?: string;
  dateFormat?: string;
  timeFormat?: string;
  country?: string;
  timezone?: string;
  id: string;
};

export type ValidationErrorsProfile = {
  fullname?: string;
  id?: string;
};

export type AccountDetailsProps = {
  data: UserData;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  saveChangesHandler: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  currentTime: string;
};

export type ProfileNavbarProps = {
  userName: string;
  toggleSidebar: () => void;
};

export type EventsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};
