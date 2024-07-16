"use client";
import {
  logo,
  leftArrow,
  profilePerson,
  star,
  link,
  preferences,
  settingIcon,
  calender,
  helpIcon,
  logoutIcon,
  personAdd,
  personButton,
} from "../../../../public";

import Button from "@/(components)/button/Button";
import DropDown from "@/(components)/dropDown/DropDown";
import Link from "next/link";
import LogoutBtn from "@/(components)/logoutBtn/LogoutBtn";
import Image from "next/image";
import { useUserProfile } from "./useUserProfile";
export default function Profile() {
  const { username, data, handleChange, saveChangesHandler } = useUserProfile();
  const menuItems = [{ text: "Dashboard", link: "/dashboard" }];

  return (
    <>
      <div className="grid grid-cols-[260px_1fr] h-[100vh]">
        <div className="w-[260px] flex flex-col border border-solid border-[#DADADA] space-y-[16px]">
          <div className=" py-[20px] px-[20px]">
            <Image src={logo} alt="logo" width={132} height={32} />
          </div>

          <div className="font-inter font-[700] text-[14.75px] leading-[24px] text-[#0069FF] py-[4px] px-[14px]">
            <Link href="/dashboard" className="flex items-center">
              <Image
                src={leftArrow}
                alt="leftArrow"
                className="mr-2"
                width={16}
                height={16}
              />
              Back to home
            </Link>
          </div>
          <div className="font-inter font-[700] text-[18px] leading-[24px] text-[#1A1A1A] py-[4px] px-[22px]">
            <h2>Account Settings</h2>
          </div>
          <div className="flex flex-col justify-between flex-grow">
            <div className="space-y-[12px] self-start">
              <div className="flex flex-row items-center space-x-[14px] font-inter font-[700] text-[15px] leading-[20px] text-[#0069FF] py-[4px] px-[22px]">
                <Image
                  src={profilePerson}
                  alt="profilePerson"
                  width={20}
                  height={20}
                />
                <h3>Profile</h3>
              </div>
              <div className="flex flex-row items-center space-x-[14px] font-inter font-[700] text-[15px] leading-[20px] text-[#1A1A1A] py-[4px] px-[22px]">
                <Image src={star} alt="star" width={20}
                  height={20} />
                <h3>Branding</h3>
              </div>
              <div className="flex flex-row items-center space-x-[14px] font-inter font-[700] text-[15px] leading-[20px] text-[#1A1A1A] py-[4px] px-[22px]">
                <Image src={link} alt="link" width={20}
                  height={20} />
                <h3>My Link</h3>
              </div>

              <div className="flex flex-row items-center space-x-[14px] font-inter font-[700] text-[15px] leading-[20px] text-[#1A1A1A] py-[4px] px-[22px]">
                <Image
                  src={preferences}
                  alt="preferences"
                  width={20}
                  height={20}
                />
                <h3>Login Preferences</h3>
              </div>
              <div className="flex flex-row items-center space-x-[14px] font-inter font-[700] text-[15px] leading-[20px] text-[#1A1A1A] py-[4px] px-[22px]">
                <Image
                  src={settingIcon}
                  alt="settingIcon"
                  width={20}
                  height={20}
                />
                <h3>Cookie Settings</h3>
              </div>
              <div className="flex flex-row items-center space-x-[14px] font-inter font-[700] text-[15px] leading-[20px] text-[#1A1A1A] py-[4px] px-[22px]">
                <Image
                  src={calender}
                  alt="calender"
                  width={20}
                  height={20}
                />
                <h3>Calender sync</h3>
              </div>
            </div>
          </div>
          <div className="space-y-[12px] self-start pb-[16px]">
            <div className="flex flex-row items-center space-x-[14px] font-inter font-[700] text-[15px] leading-[20px] text-[#1A1A1A] py-[4px] px-[22px]">
              <Image
                src={helpIcon}
                alt="helpIcon"
                width={20}
                  height={20}
              />
              <h3>Help</h3>
            </div>
            <div className="flex flex-row items-center space-x-[14px] font-inter font-[700] text-[15px] leading-[20px] text-[#1A1A1A] py-[4px] px-[22px]">
              <Image
                src={logoutIcon}
                alt="logoutIcon"
                width={20}
                  height={20}
              />
              <LogoutBtn />
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-5">
          <div className="py-3">
            <div className="flex justify-end items-center">
              <div className="mr-[32px] flex flex-row items-center space-x-[6px] py-[4px]">
                <button className="flex items-center  border border-solid border-[#0069FF] rounded-[40px] py-[11px] px-[11px] font-inter font-[600] text-[14.75px] leading-[22px] text-[#0069FF] mr-3">
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
                  className="w-[33.67px] h-[32.5px] bg-[#CCCCCC] rounded-[16px] font-inter font-[400] text-[14px] leading-[21px] text-[#1A1A1A]"
                  text={username || "T"}
                />
                <DropDown items={menuItems} />
              </div>
            </div>
          </div>

          <div className="py-3 px-7 space-y-9">
            <div className="space-y-3">
              <h3 className="font-inter font-[600] text-[15px] leading-[20px] text-[#1A1A1A9C]">
                Accounts Details
              </h3>
              <h1 className="font-inter font-[700] text-[24px] leading-[28px] text-[#1A1A1A]">
                Profile
              </h1>
            </div>
            <div className="py-3 space-y-5">
              <div className="flex flex-row items-center space-x-5">
                <Image
                  src={personButton}
                  alt="personButton"
                  width={70}
                  height={70}
                />
                <div className="space-y-3">
                  <Button
                    text="Upload picture"
                    className="rounded-[40px] font-inter font-[400] text-[14px] leading-[21px] text-[#1A1A1A] border border-solid border-[#1A1A1A] py-2 px-3"
                  />
                  <p className="font-inter font-[400] text-[14px] leading-[21px] text-[#1A1A1A9C] ">
                    JPG, GIF or PNG. MAX Size of 5MB
                  </p>
                </div>
              </div>
              <div className="max-w-[70%]">
                <div>
                  <label
                    htmlFor="fullname"
                    className="block font-inter font-[700] text-[14px] leading-[21px] text-[#1A1A1A] mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    value={data.fullname}
                    onChange={handleChange}
                    className="w-[60%] border border-solid border-[#DADADA] rounded-[8px] py-3 px-5 font-inter font-[400] text-[14px] leading-[21px] text-[#1A1A1A] mb-7"
                  />
                  <label
                    htmlFor="welcomeMessage"
                    className="block font-inter font-[700] text-[14px] leading-[21px] text-[#1A1A1A] mb-2"
                  >
                    Welcome Message
                  </label>
                  <textarea
                    rows={4}
                    name="welcomeMessage"
                    id="welcomeMessage"
                    value={data.welcomeMessage || ""}
                    onChange={handleChange}
                    className="w-[60%] border border-solid border-[#DADADA] rounded-[8px] py-3 px-5 font-inter font-[400] text-[14px] leading-[21px] text-[#1A1A1A] mb-7"
                  ></textarea>
                  <label
                    htmlFor="language"
                    className="block font-inter font-[700] text-[14px] leading-[21px] text-[#1A1A1A] mb-2"
                  >
                    Language
                  </label>
                  <select
                    name="language"
                    id="language"
                    value={data.language || "English"}
                    onChange={handleChange}
                    className="w-[60%] border border-solid border-[#DADADA] rounded-[8px] py-3 px-5 font-inter font-[400] text-[14px] leading-[21px] text-[#1A1A1A] mb-7"
                  >
                    <option value="English">English</option>
                    <option value="Arabic">Arabic</option>
                    <option value="French">French</option>
                  </select>
                  <div className="flex flex-row justify-between w-[60%]">
                    <div>
                      <label
                        htmlFor="dateFormat"
                        className="block font-inter font-[700] text-[14px] leading-[21px] text-[#1A1A1A] mb-2"
                      >
                        Date Format
                      </label>
                      <select
                        name="dateFormat"
                        id="dateFormat"
                        value={data.dateFormat || "DD/MM/YYYY"}
                        onChange={handleChange}
                        className="w-full border border-solid border-[#DADADA] rounded-[8px] py-3 px-5 font-inter font-[400] text-[14px] leading-[21px] text-[#1A1A1A] mb-7"
                      >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="timeFormat"
                        className="block font-inter font-[700] text-[14px] leading-[21px] text-[#1A1A1A] mb-2"
                      >
                        Time Format
                      </label>
                      <select
                        name="timeFormat"
                        id="timeFormat"
                        value={data.timeFormat || "12h (am/pm)"}
                        onChange={handleChange}
                        className="w-full border border-solid border-[#DADADA] rounded-[8px] py-3 px-5 font-inter font-[400] text-[14px] leading-[21px] text-[#1A1A1A] mb-7"
                      >
                        <option value="12h (am/pm)">12h (am/pm)</option>
                        <option value="24h (am/pm)">24h (am/pm)</option>
                      </select>
                    </div>
                  </div>
                  <label
                    htmlFor="country"
                    className="block font-inter font-[700] text-[14px] leading-[21px] text-[#1A1A1A] mb-2"
                  >
                    Country
                  </label>
                  <select
                    name="country"
                    id="country"
                    value={data.country || "Pakistan"}
                    onChange={handleChange}
                    className="w-[60%] border border-solid border-[#DADADA] rounded-[8px] py-3 px-5 font-inter font-[400] text-[14px] leading-[21px] text-[#1A1A1A] mb-7"
                  >
                    <option value="Pakistan">Pakistan</option>
                    <option value="United States">United States</option>
                  </select>
                  <div className="flex flex-row justify-between w-[60%]">
                    <label
                      htmlFor="timezone"
                      className="block font-inter font-[700] text-[14px] leading-[21px] text-[#1A1A1A] mb-2"
                    >
                      Timezone
                    </label>
                    <p className="font-inter font-[500] text-[14px] leading-[21px] text-[#1A1A1A] mb-2">
                      Current Time:{" "}
                      {new Date()?.toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </p>
                  </div>
                  <select
                    name="timezone"
                    id="timezone"
                    value={data.timezone || "Pakistan, Maldives Time"}
                    onChange={handleChange}
                    className="w-[60%] border border-solid border-[#DADADA] rounded-[8px] py-3 px-5 font-inter font-[400] text-[14px] leading-[21px] text-[#1A1A1A] mb-7"
                  >
                    <option value="Pakistan, Maldives Time">
                      Pakistan, Maldives Time
                    </option>
                  </select>

                  <div className="flex flex-row justify-between">
                    <div className="space-x-3">
                      <Button
                        text="Save Changes"
                        onClick={saveChangesHandler}
                        className="py-3 px-[14px] font-inter font-[600] text-[14px] leading-[21px] bg-[#0069FF] text-white rounded-[40px]"
                      />
                      <Button
                        text="Cancel"
                        className="py-3 px-[14px] font-inter font-[500] text-[14px] leading-[21px] text-black rounded-[40px] border border-solid border-[black]"
                      />
                    </div>
                    <Button
                      text="Delete Account"
                      className="py-3 px-[14px] font-inter font-[600] text-[14px] leading-[21px] bg-[#FF0000] text-white rounded-[40px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
