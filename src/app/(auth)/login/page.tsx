import Logo from "@/components/logo/Logo";
import { Login as LoginComponent } from "@/components/login/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
  keywords: ["Login", "Calendly"],
  openGraph: {
    title: "Login",
    description: "Login to your account",
    url: `${process.env.URL}/login`,
  },
};

export default function Login() {
  return (
    <div className="flex flex-col items-center md:pt-[51.28px] md:pb-[73.5px] pt-[25px] pb-[50px]">
      <div className="mb-[8.77px]">
        <Logo width={150} height={35} className="md:w-[182px] md:h-[45px]" />
      </div>
      <div className="w-[200px] mb-[9.3px] text-center md:w-[268.65px]">
        <h1 className="text-[18px] font-bold font-inter leading-[24px] md:text-[20px] md:leading-[28px]">
          Sign in with Calendly for free
        </h1>
      </div>
      <LoginComponent />
    </div>
  );
}
