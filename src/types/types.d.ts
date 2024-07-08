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
  user: {
    email: null;
    fullname: null;
  };
};
