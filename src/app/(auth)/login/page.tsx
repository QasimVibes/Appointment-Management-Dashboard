"use client";
import React from "react";
import { logo, google } from "../../../../public";
import Input from "@/(components)/input/Input";
import Link from "next/link";
import Button from "@/(components)/button/Button";
import { useLogin, inputFields } from "./useLogin";
import Image from "next/image";

export default function Login() {
  const { onChangeHandler, handleEmailSignIn, handleGoogleSignIn, data } =
    useLogin();
  return (
    <div className="flex flex-col items-center md:pt-[51.28px] md:pb-[73.5px] pt-[25px] pb-[50px]">
      <div className="mb-[8.77px]">
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
          Sign in with Calendly for free
        </h1>
      </div>
      <div className="w-[90%] md:w-[440px] rounded-[6px] border border-solid border-[#DADADA] py-[28px] px-[15px] md:px-[33px] flex flex-col shadow-[0px_1px_5px_0px_#004A7426]">
        <div>
          {inputFields?.map((input) => (
            <Input
              key={input.name}
              label={input.label}
              type={input.type}
              placeholder={input.placeholder}
              id={input.name}
              value={data[input.name as keyof typeof data]}
              onChange={onChangeHandler}
              className="mb-[12px] w-full h-[46px] rounded-[8px] border border-solid border-[#B2B2B2] px-[15px] py-[14px] text-[16px] font-normal font-Arial leading-[24px] text-[#1A1A1A]"
              labelClassName="text-[14.75px] font-bold font-inter leading-[22px] text-[#1A1A1A] mb-[8px]"
            />
          ))}
        </div>
        <div className="flex justify-end font-inter font-normal text-[14px] leading-[21px] mb-[12px] hover:text-[#C84545]">
          <Link href="/forgotPassword">Forgot password?</Link>
        </div>
        <div className="flex justify-center">
          <Button
            text="Sign In"
            onClick={handleEmailSignIn}
            className="border border-solid w-full border-[#0069FF] py-[11px] px-[16.5px] bg-[#0069FF] text-white rounded-lg"
          />
        </div>
        <div className="flex flex-col items-center p-2">
          <div className="flex w-full items-center gap-2 py-2 text-sm font-[400] font-inter">
            <div className="h-px w-full bg-[#DADADA]"></div>
            OR
            <div className="h-px w-full bg-[#DADADA]"></div>
          </div>
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full px-4 py-2 border border-gray-200 rounded-lg text-black hover:border-gray-400 hover:shadow transition duration-150"
          >
            <div className="w-6 h-6 relative mr-2">
              <Image
                src={google}
                alt="Google logo"
                layout="fill"
                objectFit="contain"
                loading="lazy"
              />
            </div>
            <span>Login with Google</span>
          </button>
        </div>
        <div className="font-inter font-normal text-[14px] leading-[18px] text-center text-[#1A1A1A] pt-[15px]">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#0069FF]">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
