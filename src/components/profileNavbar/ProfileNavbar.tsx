import Image from "next/image";
import Button from "../button/Button";
import { opner, personAdd } from "../../../public";
import DropDown from "../dropDown/DropDown";
import { menuItems } from "@/constants/Profile";
import { ProfileNavbarProps } from "@/types/types";

export default function ProfileNavbar({
  userName,
  toggleSidebar,
}: ProfileNavbarProps) {
  return (
    <div className="py-3">
      <div className="flex flex-row justify-between lg:justify-end items-center">
        <div className="flex lg:hidden items-center pl-[25px]">
          <Image
            src={opner}
            alt="opner"
            width={16}
            height={16}
            className="cursor-pointer"
            onClick={() => toggleSidebar()}
          />
        </div>
        <div className="mr-[25px] sm:mr-[32px] flex flex-row items-center space-x-[6px] py-[4px]">
          <button className="flex items-center  border border-solid border-quaternary rounded-[40px] py-[11px] px-[11px] font-inter font-[600] text-[12px] leading-[18px] sm:text-[14.75px] sm:leading-[22px] text-quaternary mr-2 sm:mr-3">
            <Image
              src={personAdd}
              alt="personAdd"
              className="mr-2"
              width={18}
              height={18}
            />
            Invite user
          </button>
          <Button
            className="w-[33.67px] h-[32.5px] bg-tertiary rounded-[16px] font-inter font-[400] text-[14px] leading-[21px] text-primary"
            text={userName || "T"}
          />
          <DropDown items={menuItems} />
        </div>
      </div>
    </div>
  );
}
