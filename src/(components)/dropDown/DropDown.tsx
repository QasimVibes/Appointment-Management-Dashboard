import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { dropDown } from "../../../public";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import LogoutBtn from "../logoutBtn/LogoutBtn";

interface DropDownProps {
  items: { text: string; link: string }[];
}

export default function DropDown({ items, ...props }: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);

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
        <Image src={dropDown} alt="dropDown" className="w-[16px] h-[16px]" />
      </button>

      {isOpen && (
        <div
          id="dropdown"
          className="absolute right-0 z-10 mt-2 w-44 bg-white border border-[#DADADA] divide-y divide-gray-100 rounded-lg shadow"
        >
          <ul
            className="py- text-sm text-[#1A1A1A]"
            aria-labelledby="dropdownDefaultButton"
          >
            {items.map((item, index) => (
              <li key={index}>
                <Link href={item.link} className="block px-4 py-2" {...props}>
                  {item.text}
                </Link>
              </li>
            ))}
            <li>
              <LogoutBtn className="block px-4 py-2"/>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
