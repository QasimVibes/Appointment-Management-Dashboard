"use client";
import { logo } from "../../../../public";
import Input from "@/(components)/input/Input";
import Button from "@/(components)/button/Button";
import Link from "next/link";
import { useSignup, inputFields } from "./useSignup";
import Image from "next/image";

export default function Register() {
  const { onChangeHandler, onHandleSubmit, signupState } = useSignup();
  return (
    <div className="flex flex-col items-center pt-[25px] pb-[50px]  md:pt-[51.28px] md:pb-[73.5px]">
      <div className="pb-[8.77px]">
        <Image
          src={logo}
          alt="logo"
          width={150}
          height={35}
          className="md:w-[182px] md:h-[45px]"
        />
      </div>
      <div className="w-[200px] mb-[9.3px] text-center md:w-[268.65px]">
        <h1 className="text-[18px] font-bold font-inter leading-[24px] md:text-[20px] md:leading-[28px]">
          Sign up with Calendly for free
        </h1>
      </div>
      <div className="w-[90%] h-auto md:w-[440px] md:h-[600px] rounded-[6px] border border-solid border-lightgray py-[28px] px-[15px] md:px-[33px] flex flex-col shadow-[0px_1px_5px_0px_#004A7426]">
        <form onSubmit={onHandleSubmit}>
          <div>
            {inputFields?.map((input) => (
              <Input
                key={input.name}
                label={input.label}
                type={input.type}
                placeholder={input.placeholder}
                value={
                  signupState[input.name as keyof typeof signupState] || ""
                }
                id={input.name}
                onChange={onChangeHandler}
                className="mb-[12px] w-full h-[46px] rounded-[8px] border border-solid border-darkgray px-[15px] py-[14px] text-[16px] font-normal font-Arial leading-[24px] text-primary"
                labelClassName="text-[14.75px] font-bold font-inter leading-[22px] text-primary mb-[8px]"
              />
            ))}
          </div>
          <div className="font-inter font-normal text-[12.91px] leading-[21px] text-danger pt-[17.5px] pl-[20px] mb-[12px]">
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
              disabled={signupState.signupStatus === "loading"}
              className="border border-solid border-quaternary py-[11px] px-[16.5px] bg-quaternary text-white rounded-[40px]"
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
    </div>
  );
}
