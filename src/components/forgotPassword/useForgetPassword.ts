import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { forgotPassword as forgotPasswordAsyncThunk } from "@/store/slice/forgotPasswordSlice";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { validateForgotPasswordData } from "@/constants/FormSchema";

export const useForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.forgotPassword);

  const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const errors = validateForgotPasswordData({ email });
    if (Object.keys(errors).length > 0) {
      Object.values(errors).forEach((message) => toast.error(message));
      return;
    }
    try {
      e.preventDefault();
      await dispatch(forgotPasswordAsyncThunk({ email })).unwrap();
      router.push(`/otpVerification?email=${encodeURIComponent(email)}`);
    } catch (error) {
      toast.error("An error occurred while sending the password reset link.");
    }
  };

  return {
    email,
    setEmail,
    onHandleSubmit,
    isLoading,
  };
};
