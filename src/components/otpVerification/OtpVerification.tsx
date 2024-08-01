"use client";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import { useOtpVerification } from "./useOtpVerification";

export function OtpVerification() {
  const { otp, handleChange, handleVerifyOtp, resendOtp, isResending } =
    useOtpVerification();

  return (
    <>
      <div className="mt-5">
        <div className="px-4 py-6">
          <div className="flex justify-center gap-1 sm:gap-2 mb-6">
            {otp.map((digit, index) => (
              <Input
                key={index}
                label=""
                id={`otp-input-${index}`}
                type="text"
                maxLength={1}
                pattern="[0-9]"
                inputMode="numeric"
                autoComplete="one-time-code"
                className="sm:w-12 sm:h-12 h-9 w-8 text-center border-2 border-lightgray rounded-md shadow-sm"
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
              className="bg-quaternary font-inter text-white font-[500] sm:text-[14px] text-[12px] sm:leading-[22px] leading-[16px] py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />

            <button
              className={`inline-block align-baseline text-quaternary ml-4 font-[500] sm:text-[14px] text-[12px] sm:leading-[22px] leading-[16px] ${
                isResending ? "cursor-not-allowed text-darkgray" : ""
              }`}
              onClick={resendOtp}
              disabled={isResending}
            >
              Resend OTP
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
