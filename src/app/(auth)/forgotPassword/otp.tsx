import Button from "@/app/(components)/Button";
import Input from "@/app/(components)/Input";
import Link from "next/link";

export default function OTP() {
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
              <form className="px-4 py-6">
                <div className="flex justify-center gap-2 mb-6">
                  <Input
                    type="text"
                    maxLength={1}
                    pattern="[0-9]"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    className="w-12 h-12 text-center border-2 border-[#DADADA] rounded-md  shadow-sm"
                    required
                  />
                  <Input
                    type="text"
                    maxLength={1}
                    pattern="[0-9]"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    className="w-12 h-12 text-center border-2 border-[#DADADA] rounded-md  shadow-sm"
                    required
                  />
                  <Input
                    type="text"
                    maxLength={1}
                    pattern="[0-9]"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    className="w-12 h-12 text-center border-2 border-[#DADADA] rounded-md  shadow-sm"
                    required
                  />
                  <Input
                    type="text"
                    maxLength={1}
                    pattern="[0-9]"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    className="w-12 h-12 text-center border-2 border-[#DADADA] rounded-md  shadow-sm"
                    required
                  />
                </div>
                <div className="flex items-center justify-center">
                  <Button
                    text="Verify"
                    className="bg-[#0069FF] font-inter text-white font-[500] text-[14px] leading-[22px] py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  />
                  <Link
                    className="inline-block align-baseline text-[#0069FF] ml-4 font-[500] text-[14px] leading-[22px]"
                    href={" "}
                  >
                    Resend OTP
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
