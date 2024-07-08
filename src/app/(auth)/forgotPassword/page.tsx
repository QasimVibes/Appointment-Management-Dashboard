import Button from "@/(components)/button/Button";
import Input from "@/(components)/input/Input";
import Link from "next/link";

export default function ForgetPassword() {
  return (
    <div className="w-full  max-w-lg mx-auto pt-[66px] ">
      <div className=" bg-[#F9F9F9]  rounded-xl shadow-lg border-2 border-[#DADADA]">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block font-inter text-[26px] leading-[34px] font-bold text-[#1A1A1A] ">
              Forgot password?
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
            <form>
              <div className="space-y-2">
                <Input
                  name="email"
                  type="email"
                  placeholder="example@ex.com"
                  label="Email"
                  className="py-3 px-4 block w-full border-2 border-[#DADADA] rounded-md text-sm focus:border-[#0069FF] focus:ring-[#0069FF] shadow-sm font-inter text-[#1A1A1A]"
                  labelClassName="text-sm font-bold ml-1 mb-2"
                  aria-describedby="email-error"
                  required
                />
                <p
                  className="hidden text-xs text-[#FF0000] mt-2"
                  id="email-error"
                >
                  Please include a valid email address so we can get back to you
                </p>
              </div>
              <div className="mt-5">
                <Button
                  text="Reset password"
                  className="py-3 w-full px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent bg-[#0069FF] text-white hover:bg-[#0069FF] focus:outline-none focus:ring-2 focus:ring-[#0069FF] focus:ring-offset-2 transition-all text-[16px] leading-[22px] font-[500]"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
