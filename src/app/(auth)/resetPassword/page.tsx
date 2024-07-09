"use client";
import Link from "next/link";
import Button from "@/(components)/button/Button";
import Input from "@/(components)/input/Input";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/hooks/reduxHook";
import { useEffect, useState } from "react";
import { resetPassword } from "@/store/slice/resetPasswordSlice";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

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
  }, [searchParams]);

  const handleResetPassword =async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      const resultAction = await dispatch(resetPassword({ email, otp, newPassword }));
      if (resetPassword.fulfilled.match(resultAction)) {
        router.push("/login");
      }
    } else {
      toast.error("Passwords do not match");
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto pt-[66px]">
      <div className="bg-[#F9F9F9] rounded-xl shadow-lg border-2 border-[#DADADA]">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block font-inter text-[26px] leading-[34px] font-bold text-[#1A1A1A]">
              Set new password
            </h1>
            <p className="mt-2 text-sm text-[#1A1A1A]">
              Remember your password?
              <Link
                className="text-[#0069FF] decoration-2 hover:underline font-medium"
                href="/login"
              >
                Login here
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <form onSubmit={handleResetPassword}>
            <div className="space-y-2">
              <Input
                type="password"
                name="new-password"
                label="New password"
                value={newPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewPassword(e.target.value)
                }
                className="py-3 px-4 block w-full border-2 border-[#DADADA] rounded-md text-sm focus:border-[#0069FF] focus:ring-[#0069FF] shadow-sm font-inter text-[#1A1A1A]"
                labelClassName="text-sm font-bold"
              />

              <Input
                type="password"
                name="confirm-password"
                label="Confirm password"
                value={confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(e.target.value)
                }
                className="py-3 px-4 block w-full border-2 border-[#DADADA] rounded-md text-sm focus:border-[#0069FF] focus:ring-[#0069FF] shadow-sm font-inter text-[#1A1A1A]"
                labelClassName="text-sm font-bold"
              />
            </div>

            <div className="mt-5">
              <Button
                text="Reset password"
                className="py-3 w-full px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent bg-[#0069FF] text-white hover:bg-[#0069FF] focus:outline-none focus:ring-2 focus:ring-[#0069FF] focus:ring-offset-2 transition-all text-[16px] leading-[22px] font-[500]"
                type="submit"
              />
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
