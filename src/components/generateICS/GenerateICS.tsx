import Button from "../button/Button";
import { exportIcon } from "../../../public";
import Image from "next/image";
import { useGenerateICS } from "./useGenerateICS";
export default function GenerateICS() {
  const { generateICSFile } = useGenerateICS();
  return (
    <div>
      <Button
        onClick={generateICSFile}
        className={`font-inter font-[500] text-[12.69px] leading-[20px] text-primary flex  border border-solid border-primary rounded-[40px] px-[13px] py-[6px]`}
      >
        <Image
          src={exportIcon}
          alt="exportIcon"
          className="mr-1 sm:block hidden"
          width={16}
          height={16}
        />
        Export
      </Button>
    </div>
  );
}
