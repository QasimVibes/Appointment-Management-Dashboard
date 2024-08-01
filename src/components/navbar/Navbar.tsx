import Image from "next/image";
import { vector } from "../../../public";
import { NavbarProps } from "@/types/types";
import { useCopyLink } from "./useNavbar";
import Button from "../button/Button";
import DropdownMenu from "../dropDownMenu/DropdownMenu";

const Navbar = ({ url }: NavbarProps) => {
  const handleCopyLink = useCopyLink(url);

  return (
    <div className="w-full h-14 bg-white">
      <div className="max-w-[800px] mx-auto flex justify-end items-center py-1.5 px-4 lg:px-0">
        <div className="flex space-x-2 font-inter font-[400] text-[14px] leading-[20px]">
          <div className="flex items-center flex-grow">
            <DropdownMenu />
          </div>
          <div className="flex">
            <Button
              className={`flex border border-solid border-primary rounded-[40px] py-[12px] px-[18px]  ${
                url ? "" : "cursor-not-allowed"
              }`}
              onClick={url ? handleCopyLink : undefined}
              disabled={!url}
            >
              <span className="flex items-center h-full mr-[8px]">
                <Image src={vector} alt="vector" width={16} height={16} />
              </span>
              Copy link
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
