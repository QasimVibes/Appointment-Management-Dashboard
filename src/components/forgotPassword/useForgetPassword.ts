import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { forgotPassword as forgotPasswordAsyncThunk } from "@/store/slice/forgotPasswordSlice";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { forgotPasswordSchema } from "@/constants/FormSchema";
import toast from "react-hot-toast";

export const useForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.forgotPassword);

  const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      forgotPasswordSchema.parse({ email });
      await dispatch(forgotPasswordAsyncThunk({ email })).unwrap();
      router.push(`/otpVerification?email=${encodeURIComponent(email)}`);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
      }
    }
  };

  return {
    email,
    setEmail,
    onHandleSubmit,
    isLoading,
  };
};
