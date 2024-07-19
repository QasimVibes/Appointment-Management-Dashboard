"use client";
import Link from "next/link";
import Button from "@/(components)/button/Button";
import Input from "@/(components)/input/Input";
import { useResetPassword } from "./useResetPassword";
import { logo } from "../../../../public";
import Image from "next/image";

export default function ResetPassword() {
  const { inputFields, handleResetPassword } = useResetPassword();

  return (
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
      <div className="bg-[#F9F9F9] rounded-xl shadow-lg border-2 border-[#DADADA] w-[90%] h-auto flex flex-col">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block font-inter text-[22px] leading-[30px] font-bold text-[#1A1A1A] sm:text-[26px] sm:leading-[34px]">
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
                {inputFields.map((field) => (
                  <Input
                    key={field.id}
                    type={field.type}
                    id={field.id}
                    label={field.label}
                    value={field.value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.setValue(e.target.value)
                    }
                    className="py-3 px-4 block w-full border-2 border-[#DADADA] rounded-md text-sm focus:border-[#0069FF] focus:ring-[#0069FF] shadow-sm font-inter text-[#1A1A1A]"
                    labelClassName="text-sm font-bold"
                  />
                ))}
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
