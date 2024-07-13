import React from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { vector } from "../../../public";

const Navbar = ({ url }: { url?: string }) => {
  const handleCopyLink = () => {
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
  };

  return (
    <div className="flex flex-row justify-center items-center h-[56px]">
      <div className="flex flex-row justify-end items-center w-[800px] space-x-[5px]">
        <div>
          <button className="border border-solid hover:border-[#1A1A1A] rounded-[40px] py-[11.5px] px-[8.820px]">
            <select name="menu" id="menu">
              <option value="menu">Menu</option>
            </select>
          </button>
        </div>
        <div className="flex">
          <button
            className={`flex border border-solid border-[#1A1A1A] rounded-[40px] py-[12px] px-[17.40px] 
              ${url ? "" : "cursor-not-allowed"}`}
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
  );
};

export default Navbar;
