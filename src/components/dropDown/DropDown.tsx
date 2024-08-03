import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { dropDown } from "../../../public";
import LogoutBtn from "../logoutBtn/LogoutBtn";
import { DropDownProps } from "@/types/types";

export default function DropDown({ items, ...props }: DropDownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className=""
        type="button"
      >
        <Image src={dropDown} alt="dropDown" width={16} height={16} />
      </button>

      {isOpen && (
        <div
          id="dropdown"
          className="absolute right-0 z-10 mt-2 w-44 bg-white border border-lightgray divide-y divide-gray-100 rounded-lg shadow"
        >
          <ul
            className="text-sm text-primary"
            aria-labelledby="dropdownDefaultButton"
          >
            {items?.map((item, index) => (
              <li key={index}>
                <Link
                  href={item?.link}
                  className="block px-4 py-2 hover:bg-lightgray"
                  {...props}
                >
                  {item?.text}
                </Link>
              </li>
            ))}
            <li>
              <LogoutBtn className="block px-4 py-2 w-full text-left hover:bg-lightgray" />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
