import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
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
  const loginState = useAppSelector((state) => state.login);
  const router = useRouter();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(loginWithEmail(data));
  };

  const handleGoogleSignIn = async () => {
    await dispatch(loginWithGoogle());
  };

  useEffect(() => {
    if (loginState.loginStatus === "succeeded") {
      toast.success("Logged in successfully");
      router.push("/dashboard");
    } else if (loginState.loginStatus === "failed") {
      toast.error(loginState.error);
    }
  }, [loginState.loginStatus, loginState.error, router]);

  useEffect(() => {
    return () => {
      dispatch(clearLoginDetails());
    };
  }, [dispatch]);

  return {
    onChangeHandler,
    handleEmailSignIn,
    handleGoogleSignIn,
  };
};
