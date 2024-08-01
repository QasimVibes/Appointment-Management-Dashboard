"use client";
import Image from "next/image";
import { dropDownBtn } from "../../../public";
import { useDropdownNavigation } from "./useDropdownNavigation";

const DropdownMenu = () => {
  const handleChange = useDropdownNavigation();
  return (
    <div className={`p-[12px] px-[10px] w-full relative`}>
      <select
        name="menu"
        id="menu"
        onChange={handleChange}
        className="appearance-none w-full pr-[20px]"
      >
        <option value="menu">Menu</option>
        <option value="dashboard">Home</option>
        <option value="profile">Profile</option>
      </select>
      <Image
        src={dropDownBtn}
        alt="dropDownBtn"
        width={9}
        height={6}
        className="absolute right-[10px] top-1/2 transform -translate-y-1/2"
      />
    </div>
  );
};

export default DropdownMenu;
