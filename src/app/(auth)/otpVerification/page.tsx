"use client";
import Button from "@/(components)/button/Button";
import Input from "@/(components)/input/Input";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/reduxHook";
import { verifyOtp } from "@/store/slice/verifyOtpSlice";

export default function OtpVerification() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [email, setEmail] = useState<string>("");
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
  }, [searchParams]);

  const handleChange = (index: number, value: string) => {
    if (value.match(/^[0-9]$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < otp.length - 1 && value) {
        const nextSibling = document.getElementById(`otp-input-${index + 1}`);
        if (nextSibling) {
          nextSibling.focus();
        }
      }
    }
  };

  const handleVerifyOtp = async () => {
    const otpCode = otp.join("");
    const resultAction = await dispatch(verifyOtp({ email, otp: otpCode }));

    if (verifyOtp.fulfilled.match(resultAction)) {
      router.push(`/resetPassword?email=${encodeURIComponent(email)}&otp=${otpCode}`);
    }
  };

  return (
    <>
      <div className="w-full  max-w-lg mx-auto pt-[66px] ">
        <div className=" bg-[#F9F9F9]  rounded-xl shadow-lg border-2 border-[#DADADA]">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block font-inter text-[26px] leading-[34px] font-bold text-[#1A1A1A] ">
                Enter OTP
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
              <div className="px-4 py-6">
                <div className="flex justify-center gap-2 mb-6">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-input-${index}`}
                      type="text"
                      maxLength={1}
                      pattern="[0-9]"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      className="w-12 h-12 text-center border-2 border-[#DADADA] rounded-md shadow-sm"
                      value={digit}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(index, e.target.value)
                      }
                      required
                    />
                  ))}
                </div>
                <div className="flex items-center justify-center">
                  <Button
                    text="Verify"
                    onClick={handleVerifyOtp}
                    className="bg-[#0069FF] font-inter text-white font-[500] text-[14px] leading-[22px] py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  />
                  <Link
                    className="inline-block align-baseline text-[#0069FF] ml-4 font-[500] text-[14px] leading-[22px]"
                    href="#"
                  >
                    Resend OTP
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
