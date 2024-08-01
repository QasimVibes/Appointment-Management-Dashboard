import { useAppDispatch } from "@/hooks/reduxHook";
import { forgotPassword as forgotPasswordAsyncThunk } from "@/store/slice/forgotPasswordSlice";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { forgotPasswordSchema } from "@/types/ValidationSchema/FormSchema";
import toast from "react-hot-toast";

export const useForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      forgotPasswordSchema.parse({ email });
      const resultAction = await dispatch(forgotPasswordAsyncThunk({ email }));
      if (forgotPasswordAsyncThunk.fulfilled.match(resultAction)) {
        router.push(`/otpVerification?email=${encodeURIComponent(email)}`);
      }
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

  return {
    email,
    setEmail,
    onHandleSubmit,
  };
};
