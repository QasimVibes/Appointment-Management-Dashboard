import Image from "next/image";
import { logo } from "../../../public";
import { LogoProps } from "@/types/types";

export default function Logo({
  width,
  height,
  className = "",
  ...props
}: LogoProps) {
  return (
    <>
      <Image
        src={logo}
        alt="logo"
        width={width}
        height={height}
        className={`${className}`}
        {...props}
      />
    </>
  );
}
