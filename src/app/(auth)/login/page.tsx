"use client";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { Image, logo, google } from "@/app/constants/images";
import Input from "@/app/(components)/Input";
import Link from "next/link";
import Button from "@/app/(components)/Button";
import toast from "react-hot-toast";

export default function Login() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (response?.ok) {
        toast.success("Welcome back!");
        router.push("/");
      }
    } catch (error) {
      toast.error("Sign in failed");
      console.error("Sign in error:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
     await signIn("google");
    } catch (error) {
      toast.error("Google sign-in failed");
      console.error("Google sign-in error:", error);
    }
  };

  // Remove after middleware is added
  if (session) {
    router.push("/");
    return null;
  }

  return (
    <div className="flex flex-col items-center pt-[51.28px] pb-[73.5px]">
      <div>
        <Image src={logo} alt="logo" />
      </div>
      <div className="w-[268.65px] h-[43.2px]">
        <h1 className="text-[20px] font-bold font-inter leading-[28px] text-center">
          Sign in with Calendly for free
        </h1>
      </div>
      <div className="w-[440px] rounded-[6px] border border-solid border-[#DADADA] py-[28px] px-[33px] flex flex-col shadow-[0px_1px_5px_0px_#004A7426]">
        <form onSubmit={handleEmailSignIn}>
          <Input
            label="Enter your email."
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            className="w-[374px] h-[46px] rounded-[8px] border border-solid border-[#B2B2B2] px-[15px] py-[14px] text-[16px] font-normal font-Arial leading-[24px] text-[#1A1A1A]"
            labelClassName="text-[14.75px] font-bold font-inter leading-[22px] text-[#1A1A1A] mb-[8px]"
          />
          <Input
            label="Enter your password"
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            className="w-[374px] h-[46px] rounded-[8px] border border-solid border-[#B2B2B2] px-[15px] py-[14px] text-[16px] font-normal font-Arial leading-[24px] text-[#1A1A1A]"
            labelClassName="text-[14.75px] font-bold font-inter leading-[22px] text-[#1A1A1A]  mb-[8px]"
          />
          <div className="flex justify-end font-inter font-normal text-[14px] leading-[21px]  mb-[12px]">
            <Link href="#">Forgot password?</Link>
          </div>
          <div className="flex justify-center">
            <Button
              text="Sign In"
              className="border border-solid w-full border-[#0069FF] py-[11px] px-[16.5px] bg-[#0069FF] text-white rounded-lg"
            />
          </div>
          <div className="flex flex-col items-center p-2">
            <div className="flex w-full items-center gap-2 py-2 text-sm text-slate-600">
              <div className="h-px w-full bg-slate-200"></div>
              OR
              <div className="h-px w-full bg-slate-200"></div>
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
        </form>
        <div className="font-inter font-normal text-[14px] leading-[18px] text-center text-[#1A1A1A] pt-[15px]">
          <p>
            Don't have an account?{" "}
            <Link href="/register" className="text-[#0069FF]">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
