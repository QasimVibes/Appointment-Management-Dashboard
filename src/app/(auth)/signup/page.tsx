"use client";
import { Image, logo } from "@/constants/images";
import Input from "@/(components)/Input";
import Button from "@/(components)/Button";
import Link from "next/link";
import { useSignup, inputFields } from "./useSignup";

export default function Register() {
  const { onChangeHandler, onHandleSubmit, signupState } = useSignup();
  return (
    <div className="flex flex-col items-center pt-[51.28px] pb-[73.5px]">
      <div className="pb-[8.77px]">
        <Image src={logo} alt="logo" />
      </div>
      <div className="w-[268.65px] mb-[9.3px]">
        <h1 className="text-[20px] font-bold font-inter leading-[28px] text-center">
          Sign up with Calendly for free
        </h1>
      </div>
      <div className="w-[440px] h-[600px] rounded-[6px] border border-solid border-[#DADADA] py-[28px] px-[33px] flex flex-col shadow-[0px_1px_5px_0px_#004A7426]">
        <form onSubmit={onHandleSubmit}>
          <div>
            {inputFields?.map((input) => (
              <Input
                key={input.name}
                label={input.label}
                type={input.type}
                placeholder={input.placeholder}
                name={input.name}
                onChange={onChangeHandler}
                className="mb-[12px] w-[374px] h-[46px] rounded-[8px] border border-solid border-[#B2B2B2] px-[15px] py-[14px] text-[16px] font-normal font-Arial leading-[24px] text-[#1A1A1A]"
                labelClassName="text-[14.75px] font-bold font-inter leading-[22px] text-[#1A1A1A]  mb-[8px]"
              />
            ))}
          </div>
          <div className="font-inter font-normal text-[12.91px] leading-[21px] text-[#C84545] pt-[17.5px] pl-[20px] mb-[12px]">
            <p>Use a few words, avoid common phrases</p>
            <p>No need for symbols, digits, or uppercase letters</p>
          </div>
          <div className="font-inter font-normal text-[12px] leading-[18px] text-center text-[#1A1A1A] pt-[15px] w-[374px] h-[44px] mb-[12px]">
            <p>
              By creating a Calendly account, you agree to{" "}
              <span className="text-[#0069FF]">Calendly's Terms</span> and{" "}
              <span className="text-[#0069FF]">Privacy Policy</span>
            </p>
          </div>
          <div className="flex justify-center">
            <Button
              text="Sign Up"
              disabled={signupState.signupStatus === "loading"}
              className="border border-solid border-[#0069FF] py-[11px] px-[16.5px] bg-[#0069FF] text-white rounded-[40px]"
            />
          </div>
        </form>
        <div className="flex justify-center font-inter font-normal text-[14px] leading-[21px] text-center text-[#1A1A1A] pt-[10px] w-[374px] h-[44px]">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="text-[#0069FF]">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
