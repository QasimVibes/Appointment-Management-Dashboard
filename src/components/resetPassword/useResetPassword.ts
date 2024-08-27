import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { useEffect, useState } from "react";
import { resetPassword } from "@/store/slice/resetPasswordSlice";
import toast from "react-hot-toast";
import { validatePasswordResetData } from "@/constants/FormSchema";

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
      const errors = validatePasswordResetData({
        newPassword,
        confirmPassword,
      });
      if (Object.keys(errors).length > 0) {
        Object.values(errors).forEach((message) => toast.error(message));
        return;
      }

      if (newPassword === confirmPassword) {
        const resultAction = await dispatch(
          resetPassword({ email, otp, newPassword })
        );
        if (resetPassword.fulfilled.match(resultAction)) {
          router.push("/login");
        }
      }
    } catch (error) {
      toast.error("An error occurred while resetting the password.");
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
