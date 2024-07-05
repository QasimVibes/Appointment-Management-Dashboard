import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearSignupDetails, signupUser } from "@/store/slice/signupSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { SignupProps } from "@/types/types";

export const inputFields = [
  {
    label: "Enter your email to get started.",
    type: "email",
    placeholder: "Email",
    name: "email",
  },
  {
    label: "Enter your full name.",
    type: "text",
    placeholder: "John Doe",
    name: "fullname",
  },
  {
    label: "Enter your username",
    type: "text",
    placeholder: "John Doe",
    name: "username",
  },
  {
    label: "Choose a password with at least 8 characters.",
    type: "password",
    placeholder: "Password",
    name: "password",
  },
];

export const useSignup = () => {
  const dispatch = useAppDispatch();
  const signupState = useAppSelector((state) => state.signup);
  const router = useRouter();
  const [data, setData] = useState<SignupProps>({
    email: "",
    fullname: "",
    username: "",
    password: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   dispatch(signupUser(data));
  };

  useEffect(() => {
    if (signupState.signupStatus === "succeeded") {
      router.push("/login");
    }
  }, [signupState.signupStatus, signupState.error, router]);

  useEffect(() => {
    dispatch(clearSignupDetails());
  }, [dispatch]);

  return {
    onChangeHandler,
    onHandleSubmit,
    signupState,
  };
};
