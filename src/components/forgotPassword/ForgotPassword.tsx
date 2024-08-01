"use client";
import Button from "../button/Button";
import Input from "../input/Input";
import { useForgotPassword } from "./useForgetPassword";

export function ForgotPassword() {
  const { email, setEmail, onHandleSubmit } = useForgotPassword();
  return (
    <>
      <div className="mt-5">
        <div className="space-y-2">
          <Input
            id="email"
            type="email"
            placeholder="example@ex.com"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="py-3 px-4 block w-full border-2 border-lightgray rounded-md text-sm focus:border-quaternary focus:ring-quaternary shadow-sm font-inter text-primary"
            labelClassName="text-sm font-bold ml-1 mb-2"
            aria-describedby="email-error"
          />
        </div>
        <div className="mt-5">
          <Button
            text="Reset password"
            onClick={onHandleSubmit}
            className="py-3 w-full px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent bg-quaternary text-white hover:bg-quaternary focus:outline-none focus:ring-2 focus:ring-quaternary focus:ring-offset-2 transition-all text-[16px] leading-[22px] font-[500]"
          />
        </div>
      </div>
    </>
  );
}
