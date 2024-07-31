"use client";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import Link from "next/link";
import { useOtpVerification } from "./useOtpVerification";
import { logo } from "../../../../public";
import Image from "next/image";

export default function OtpVerification() {
  const { otp, handleChange, handleVerifyOtp, resendOtp, isResending } =
    useOtpVerification();

  return (
    <>
      <div className="w-full max-w-xl mx-auto sm:pt-[66px] pt-[40px] flex flex-col items-center">
        <div className="flex justify-center mb-6">
          <Image
            src={logo}
            alt="logo"
            width={150}
            height={35}
            className="sm:w-[182px] sm:h-[45px]"
          />
        </div>
        <div className="bg-darkzinc rounded-xl shadow-lg border-2 border-lightgray w-[90%] h-auto flex flex-col">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block font-inter text-[22px] leading-[30px] font-bold text-primary sm:text-[26px] sm:leading-[34px]">
                Enter OTP
              </h1>
              <p className="mt-2 text-sm text-primary">
                Remember your password?
                <Link
                  className="text-quaternary decoration-2 hover:underline font-medium"
                  href="/login"
                >
                  Login here
                </Link>
              </p>
            </div>

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
          </div>
        </div>
      </div>
    </>
  );
}
