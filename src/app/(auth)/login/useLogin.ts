import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { loginSchema } from "@/types/ValidationSchema/FormSchema";
import { z } from "zod";
import {
  clearLoginDetails,
  loginWithEmail,
  loginWithGoogle,
} from "@/store/slice/loginSlice";
import toast from "react-hot-toast";

export const inputFields = [
  {
    label: "Enter your email",
    type: "email",
    placeholder: "Email",
    name: "email",
  },
  {
    label: "Enter your password",
    type: "password",
    placeholder: "Password",
    name: "password",
  },
];

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const { loginStatus, error } = useAppSelector((state) => state.login);
  const router = useRouter();

  const [data, setData] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    },
    []
  );

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      loginSchema.parse(data);
      await dispatch(loginWithEmail(data)).unwrap();
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
      }
    }
  };

  const handleGoogleSignIn = async () => {
    await dispatch(loginWithGoogle()).unwrap();
  };

  useEffect(() => {
    if (loginStatus === "succeeded") {
      toast.success("Logged in successfully");
      router.push("/");
    } else if (loginStatus === "failed") {
      toast.error(error);
    }
  }, [loginStatus, error, router]);

  useEffect(() => {
    return () => {
      dispatch(clearLoginDetails());
    };
  }, [dispatch]);

  return {
    onChangeHandler,
    handleEmailSignIn,
    handleGoogleSignIn,
    data,
  };
};
