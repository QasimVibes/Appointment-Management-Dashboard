import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearSignupDetails, signupUser } from "@/store/slice/signupSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { SignupProps } from "@/types/types";
import { z } from "zod";
import { signupSchema } from "@/types/ValidationSchema/FormSchema";
import toast from "react-hot-toast";

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
    try {
      signupSchema.parse(data);
      dispatch(signupUser(data));
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
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
