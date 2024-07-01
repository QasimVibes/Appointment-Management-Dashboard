"use client";
import Link from "next/link";
import Button from "@/app/(components)/Button";
import Input from "@/app/(components)/Input";

export default function ConfirmPassword() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted");
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
            <form onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Input
                  type="password"
                  name="new-password"
                  label="New password"
                  className="py-3 px-4 block w-full border-2 border-[#DADADA] rounded-md text-sm focus:border-[#0069FF] focus:ring-[#0069FF] shadow-sm font-inter text-[#1A1A1A]"
                  labelClassName="text-sm font-bold"
                />

                <Input
                  type="password"
                  name="confirm-password"
                  label="Confirm password"
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
