import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/reduxHook";
import { verifyOtp } from "@/store/slice/verifyOtpSlice";
import { validateOTPData } from "@/constants/FormSchema";
import { forgotPassword } from "@/store/slice/forgotPasswordSlice";
import toast from "react-hot-toast";

export const useOtpVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [email, setEmail] = useState<string>("");
  const [isResending, setIsResending] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    } else {
      router.push("/login");
    }
  }, [searchParams, router]);

  const handleChange = (index: number, value: string) => {
    if (value.match(/^[0-9]$/) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value === "" && index > 0) {
        const prevSibling = document.getElementById(`otp-input-${index - 1}`);
        if (prevSibling) {
          prevSibling.focus();
        }
      } else if (index < otp.length - 1 && value !== "") {
        const nextSibling = document.getElementById(`otp-input-${index + 1}`);
        if (nextSibling) {
          nextSibling.focus();
        }
      }
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const otpCode = otp.join("");
      const errors = validateOTPData({ otp: otpCode });
      if (Object.keys(errors).length > 0) {
        Object.values(errors).forEach((message) => toast.error(message));
        return;
      }

      const resultAction = await dispatch(verifyOtp({ email, otp: otpCode }));
      if (verifyOtp.fulfilled.match(resultAction)) {
        router.push(
          `/resetPassword?email=${encodeURIComponent(email)}&otp=${otpCode}`
        );
      }
    } catch (error) {
      toast.error("An error occurred while verifying the OTP.");
    }
  };

  const resendOtp = async () => {
    try {
      if (isResending) {
        return;
      }
      setIsResending(true);
      const resultAction = await dispatch(forgotPassword({ email }));
      if (forgotPassword.fulfilled.match(resultAction)) {
        setTimeout(() => {
          setIsResending(false);
        }, 60000);
      }
    } catch (error) {
      toast.error("Failed to resend OTP. Please try again.");
      setIsResending(false);
    }
  };

  return {
    otp,
    handleChange,
    handleVerifyOtp,
    resendOtp,
    isResending,
  };
};
