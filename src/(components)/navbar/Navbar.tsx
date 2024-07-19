import React from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { vector, dropDownBtn } from "../../../public";

const Navbar = ({ url }: { url?: string }) => {
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const linkToCopy = `${window.location.origin}/scheduled/${url}`;
      navigator.clipboard.writeText(linkToCopy).then(
        () => {
          toast.success("Link copied to clipboard!");
        },
        (err) => {
          toast.error("Failed to copy the link.");
          console.error("Failed to copy: ", err);
        }
      );
    } else {
      console.error("Window object is not defined.");
    }
  };

  return (
    <div className="w-full h-14 bg-[#FFFFFF]">
      <div className="max-w-[800px] mx-auto flex justify-end items-center py-1.5 px-4 lg:px-0">
        <div className="flex space-x-2 font-inter font-[400] text-[13.13px] leading-[20px]">
          <div className="flex items-center flex-grow">
            <button className="flex items-center p-[11.5px] px-[9.82px] w-full relative">
              <select
                name="menu"
                id="menu"
                className="appearance-none w-full pr-[20px]"
              >
                <option value="menu">Menu</option>
              </select>
              <Image
                src={dropDownBtn}
                alt="dropDownBtn"
                width={9}
                height={6}
                className="absolute right-[10px] top-1/2 transform -translate-y-1/2"
              />
            </button>
          </div>
          <div className="flex">
            <button
              className={`flex border border-solid border-[#1A1A1A] rounded-[40px] py-[12px] px-[17.40px]  ${
                url ? "" : "cursor-not-allowed"
              }`}
              onClick={url ? handleCopyLink : undefined}
              disabled={!url}
            >
              <span className="flex items-center h-full mr-[8px]">
                <Image src={vector} alt="vector" width={16} height={16} />
              </span>
              Copy link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
