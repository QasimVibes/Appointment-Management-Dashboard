import Logo from "@/components/logo/Logo";
import { Signup as SignupComponent } from "@/components/signup/Signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Sign up with Calendly",
  keywords: "Sign up, Calendly",
  openGraph: {
    title: "Sign up",
    description: "Sign up with Calendly",
    url: `${process.env.URL}/signup`,
  },
};
export default function Signup() {
  return (
    <div className="flex flex-col items-center pt-[25px] pb-[50px]  md:pt-[51.28px] md:pb-[73.5px]">
      <div className="pb-[8.77px]">
        <Logo width={150} height={35} className="md:w-[182px] md:h-[45px]" />
      </div>
      <div className="w-[200px] mb-[9.3px] text-center md:w-[268.65px]">
        <h1 className="text-[18px] font-bold font-inter leading-[24px] md:text-[20px] md:leading-[28px]">
          Sign up with Calendly for free
        </h1>
      </div>
      <SignupComponent />
    </div>
  );
}
