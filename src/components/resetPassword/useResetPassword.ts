import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { useEffect, useState } from "react";
import { resetPassword } from "@/store/slice/resetPasswordSlice";
import toast from "react-hot-toast";
import { resetPasswordSchema } from "@/constants/FormSchema";
import { z } from "zod";

export const useResetPassword = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const emailParam = searchParams.get("email");
    const otpParam = searchParams.get("otp");
    if (emailParam && otpParam) {
      setEmail(emailParam);
      setOtp(otpParam);
    } else {
      router.push("/login");
    }
  }, [searchParams, router]);

  const { isLoading } = useAppSelector((state) => state.resetPassword);

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      resetPasswordSchema.parse({ newPassword, confirmPassword });
      if (newPassword === confirmPassword) {
        const resultAction = await dispatch(
          resetPassword({ email, otp, newPassword })
        );
        if (resetPassword.fulfilled.match(resultAction)) {
          router.push("/login");
        }
      } else {
        toast.error("Passwords do not match");
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
    handleResetPassword,
    newPassword,
    confirmPassword,
    setNewPassword,
    setConfirmPassword,
    isLoading,
  };
};
