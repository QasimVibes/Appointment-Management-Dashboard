"use client";
import { Image, logo } from "@/app/constants/images";
import Input from "@/app/(components)/Input";
import Button from "@/app/(components)/Button";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Register() {
  const [data, setData] = useState({
    email: "",
    name: "",
    username: "",
    password: "",
  });
  const router = useRouter();

  const onchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("/api/register", data);
      toast.success("Registration successful");
      router.push("/login");
    } catch (error) {
      toast.error("Registration failed");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center pt-[51.28px] pb-[73.5px]">
      <div>
        <Image src={logo} alt="logo" />
      </div>
      <div className="w-[268.65px] h-[43.2px]">
        <h1 className="text-[20px] font-bold font-inter leading-[28px] text-center">
          Sign up with Calendly for free
        </h1>
      </div>
      <div className="w-[440px] h-[600px] rounded-[6px] border border-solid border-[#DADADA] py-[28px] px-[33px] flex flex-col shadow-[0px_1px_5px_0px_#004A7426]">
        <form onSubmit={onHandleSubmit}>
          <Input
            label="Enter your email to get started."
            type="email"
            placeholder="Email"
            name="email"
            onChange={onchangeHandler}
            className="w-[374px] h-[46px] rounded-[8px] border border-solid border-[#B2B2B2] px-[15px] py-[14px] text-[16px] font-normal font-Arial leading-[24px] text-[#1A1A1A]"
            labelClassName="text-[14.75px] font-bold font-inter leading-[22px] text-[#1A1A1A] mb-[8px]"
          />
          <Input
            label="Enter your full name."
            type="text"
            placeholder="John Doe"
            name="name"
            onChange={onchangeHandler}
            className="w-[374px] h-[46px] rounded-[8px] border border-solid border-[#B2B2B2] px-[15px] py-[14px] text-[16px] font-normal font-Arial leading-[24px] text-[#1A1A1A]"
            labelClassName="text-[14.75px] font-bold font-inter leading-[22px] text-[#1A1A1A]  mb-[8px]"
          />
          <Input
            label="Enter your username"
            type="text"
            placeholder="John Doe"
            name="username"
            onChange={onchangeHandler}
            className="w-[374px] h-[46px] rounded-[8px] border border-solid border-[#B2B2B2] px-[15px] py-[14px] text-[16px] font-normal font-Arial leading-[24px] text-[#1A1A1A]"
            labelClassName="text-[14.75px] font-bold font-inter leading-[22px] text-[#1A1A1A]  mb-[8px]"
          />
          <Input
            label="Choose a password with at least 8 characters."
            type="password"
            placeholder="Password"
            name="password"
            onChange={onchangeHandler}
            className="w-[374px] h-[46px] rounded-[8px] border border-solid border-[#B2B2B2] px-[15px] py-[14px] text-[16px] font-normal font-Arial leading-[24px] text-[#1A1A1A]"
            labelClassName="text-[14.75px] font-bold font-inter leading-[22px] text-[#1A1A1A]  mb-[8px]"
          />
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
