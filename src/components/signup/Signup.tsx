"use client";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import Link from "next/link";
import { useSignup } from "./useSignup";
import { inputFieldsSignup } from "@/constants/InputDetails";
export function Signup() {
  const { onChangeHandler, onHandleSubmit, signupState, data } = useSignup();
  return (
    <div className="w-[90%] h-auto md:w-[440px] md:h-[600px] rounded-[6px] border border-solid border-lightgray py-[28px] px-[15px] md:px-[33px] flex flex-col shadow-[0px_1px_5px_0px_#004A7426]">
      <form onSubmit={onHandleSubmit}>
        <div>
          {inputFieldsSignup?.map((input) => (
            <Input
              key={input?.name}
              label={input?.label}
              type={input?.type}
              placeholder={input?.placeholder}
              value={data[input?.name] || ""}
              id={input?.name}
              onChange={onChangeHandler}
              className="mb-[12px] w-full h-[46px] rounded-[8px] border border-solid border-darkgray px-[15px] py-[14px] text-[16px] font-normal font-Arial leading-[24px] text-primary"
              labelClassName="text-[14.75px] font-bold font-inter leading-[22px] text-primary mb-[8px]"
            />
          ))}
        </div>
        <div className=" w-full h-[6px] bg-redwhite"></div>
        <div className="font-inter font-normal text-[12.91px] leading-[21px] text-darkRed pt-[11.5px] pl-[20px] mb-[12px]">
          <p>Use a few words, avoid common phrases</p>
          <p>No need for symbols, digits, or uppercase letters</p>
        </div>
        <div className="font-inter font-normal text-[12px] leading-[18px] text-center text-primary pt-[15px] w-full md:w-[374px] h-auto md:h-[44px] mb-[12px]">
          <p>
            By creating a Calendly account, you agree to{" "}
            <span className="text-quaternary">Calendly&apos;s Terms</span> and{" "}
            <span className="text-quaternary">Privacy Policy</span>
          </p>
        </div>
        <div className="flex justify-center">
          <Button
            text="Sign Up"
            disabled={signupState?.signupStatus === "loading"}
            isLoading={signupState?.isLoading}
            className="font-inter font-[700] text-[12.91px] leading-[22px] border border-solid border-quaternary py-[11px] px-[16.5px] bg-quaternary text-white rounded-[40px]"
          />
        </div>
      </form>
      <div className="flex justify-center font-inter font-normal text-[14px] leading-[21px] text-center text-primary pt-[10px] w-full md:w-[374px] h-auto md:h-[44px]">
        <p>
          Already have an account?{" "}
          <Link href="/login" className="text-quaternary">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
