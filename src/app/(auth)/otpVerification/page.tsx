import Link from "next/link";
import Logo from "@/components/logo/Logo";
import { OtpVerification as OtpVerificationComponent } from "@/components/otpVerification/OtpVerification";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OTP Verification",
  description: "OTP Verification",
  keywords: "OTP Verification",
  openGraph: {
    title: "OTP Verification",
    description: "OTP Verification",
    url: `${process.env.URL}/otpVerification`,
  },
};

export default function OtpVerification() {
  return (
    <>
      <div className="w-full max-w-xl mx-auto sm:pt-[66px] pt-[40px] flex flex-col items-center">
        <div className="flex justify-center mb-6">
          <Logo width={150} height={35} className="sm:w-[182px] sm:h-[45px]" />
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
            <OtpVerificationComponent />
          </div>
        </div>
      </div>
    </>
  );
}
