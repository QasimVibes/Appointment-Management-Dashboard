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
  closer,
  opner,
  dropDownBtn,
} from "../../../../public";

import Button from "@/(components)/button/Button";
import DropDown from "@/(components)/dropDown/DropDown";
import Link from "next/link";
import LogoutBtn from "@/(components)/logoutBtn/LogoutBtn";
import Image from "next/image";
import { useUserProfile } from "./useUserProfile";
import { useState } from "react";
import SideBar from "@/(components)/sidebar/SideBar";
export default function Profile() {
  const {
    userName,
    data,
    handleChange,
    saveChangesHandler,
    currentTime,
    editMode,
  } = useUserProfile();
  const menuItems = [{ text: "Dashboard", link: "/dashboard" }];
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className="relative h-[100vh] flex">
        {/* Left Side */}
        <SideBar isSidebarOpen={isSidebarOpen}>
          <div className="flex items-center justify-between p-[20px]">
            <Image src={logo} alt="logo" width={132} height={32} />

            <button
              className="cursor-pointer"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Image src={closer} alt="closer" width={16} height={16} />
            </button>
          </div>

          <div className="font-inter font-[700] text-[14.75px] leading-[24px] text-quaternary py-[4px] px-[14px]">
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
          <div className="font-inter font-[700] text-[18px] leading-[24px] text-primary py-[4px] px-[22px]">
            <h2>Account Settings</h2>
          </div>
          <div className="flex flex-col justify-between flex-grow">
            <div className="space-y-[12px] self-start">
              <div className="flex flex-row items-center space-x-[14px] font-inter font-[700] text-[15px] leading-[20px] text-quaternary py-[4px] px-[22px]">
                <Image
                  src={profilePerson}
                  alt="profilePerson"
                  width={20}
                  height={20}
                />
                <h3>Profile</h3>
              </div>
              <div className="flex flex-row items-center space-x-[14px] font-inter font-[700] text-[15px] leading-[20px] text-primary py-[4px] px-[22px]">
                <Image src={star} alt="star" width={20} height={20} />
                <h3>Branding</h3>
              </div>
              <div className="flex flex-row items-center space-x-[14px] font-inter font-[700] text-[15px] leading-[20px] text-primary py-[4px] px-[22px]">
                <Image src={link} alt="link" width={20} height={20} />
                <h3>My Link</h3>
              </div>

              <div className="flex flex-row items-center space-x-[14px] font-inter font-[700] text-[15px] leading-[20px] text-primary py-[4px] px-[22px]">
                <Image
                  src={preferences}
                  alt="preferences"
                  width={20}
                  height={20}
                />
                <h3>Login Preferences</h3>
              </div>
              <div className="flex flex-row items-center space-x-[14px] font-inter font-[700] text-[15px] leading-[20px] text-primary py-[4px] px-[22px]">
                <Image
                  src={settingIcon}
                  alt="settingIcon"
                  width={20}
                  height={20}
                />
                <h3>Cookie Settings</h3>
              </div>
              <div className="flex flex-row items-center space-x-[14px] font-inter font-[700] text-[15px] leading-[20px] text-primary py-[4px] px-[22px]">
                <Image src={calender} alt="calender" width={20} height={20} />
                <h3>Calender sync</h3>
              </div>
            </div>
          </div>
          <div className="space-y-[12px] self-start pb-[16px] mt-3 lg:mt-0">
            <div className="flex flex-row items-center space-x-[14px] font-inter font-[700] text-[15px] leading-[20px] text-primary py-[4px] px-[22px]">
              <Image src={helpIcon} alt="helpIcon" width={20} height={20} />
              <h3>Help</h3>
            </div>
            <div className="flex flex-row items-center space-x-[14px] font-inter font-[700] text-[15px] leading-[20px] text-primary py-[4px] px-[22px]">
              <Image src={logoutIcon} alt="logoutIcon" width={20} height={20} />
              <LogoutBtn />
            </div>
          </div>
        </SideBar>

        {/* Right Side */}
        <div className="flex-1 h-full overflow-auto space-y-5">
          <div className="py-3">
            <div className="flex flex-row justify-between lg:justify-end items-center">
              <div className="flex lg:hidden items-center pl-[25px]">
                <Image
                  src={opner}
                  alt="opner"
                  width={16}
                  height={16}
                  className="cursor-pointer"
                  onClick={() => setIsSidebarOpen(true)}
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

          <div className="py-3 px-7 space-y-9">
            <div className="space-y-3">
              <h3 className="font-inter font-[600] text-[15px] leading-[20px] text-secondary">
                Accounts Details
              </h3>
              <h1 className="font-inter font-[700] text-[24px] leading-[28px] text-primary">
                Profile
              </h1>
            </div>
            <div className="py-3 space-y-5">
              <div className="flex flex-col sm:flex-row items-center space-y-5 sm:space-y-0 sm:space-x-5">
                <Image
                  src={personButton}
                  alt="personButton"
                  width={70}
                  height={70}
                />
                <div className="space-y-3 text-center sm:text-left">
                  <Button
                    text="Upload picture"
                    className="rounded-[40px] font-inter font-[400] text-[14px] leading-[21px] text-primary border border-solid border-primary py-2 px-3"
                  />
                  <p className="font-inter font-[400] text-[14px] leading-[21px] text-secondary ">
                    JPG, GIF or PNG. MAX Size of 5MB
                  </p>
                </div>
              </div>
              <div className="w-full max-w-full sm:max-w-[90%] lg:max-w-[80%]">
                <div>
                  <label
                    htmlFor="fullname"
                    className="block font-inter font-[700] text-[14px] leading-[21px] text-primary mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    value={data.fullname}
                    onChange={handleChange}
                    className="w-full sm:w-[60%] border border-solid border-lightgray rounded-[8px] py-3 px-5 font-inter font-[400] text-[14px] leading-[21px] text-primary mb-7"
                  />
                  <label
                    htmlFor="welcomeMessage"
                    className="block font-inter font-[700] text-[14px] leading-[21px] text-primary mb-2"
                  >
                    Welcome Message
                  </label>
                  <textarea
                    rows={4}
                    name="welcomeMessage"
                    id="welcomeMessage"
                    value={data.welcomeMessage || ""}
                    onChange={handleChange}
                    className="w-full sm:w-[60%] border border-solid border-lightgray rounded-[8px] py-3 px-5 font-inter font-[400] text-[14px] leading-[21px] text-primary mb-7"
                  ></textarea>

                  <div className="relative w-full sm:w-[60%] ">
                    <label
                      htmlFor="language"
                      className="block font-inter font-[700] text-[14px] leading-[21px] text-primary mb-2"
                    >
                      Language
                    </label>
                    <select
                      name="language"
                      id="language"
                      value={data.language || "English"}
                      onChange={handleChange}
                      className="w-full border appearance-none border-solid border-lightgray rounded-[8px] py-3 px-5 font-inter font-[400] text-[14px] leading-[21px] text-primary mb-7"
                    >
                      <option value="English">English</option>
                      <option value="Arabic">Arabic</option>
                      <option value="French">French</option>
                    </select>
                    <div className="absolute inset-y-0 right-[11px] md:right-[22.53px] flex items-center pointer-events-none">
                      <Image
                        src={dropDownBtn}
                        alt="dropDownBtn"
                        width={9}
                        height={6}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:space-x-5 w-full sm:w-[60%]">
                    <div className="w-full relative">
                      <label
                        htmlFor="dateFormat"
                        className="block font-inter font-[700] text-[14px] leading-[21px] text-primary mb-2"
                      >
                        Date Format
                      </label>
                      <select
                        name="dateFormat"
                        id="dateFormat"
                        value={data.dateFormat || "DD/MM/YYYY"}
                        onChange={handleChange}
                        className="w-full border appearance-none border-solid border-lightgray rounded-[8px] py-3 px-5 font-inter font-[400] text-[14px] leading-[21px] text-primary mb-7"
                      >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      </select>
                      <div className="absolute inset-y-0 right-[11px] md:right-[22.53px] flex items-center pointer-events-none">
                        <Image
                          src={dropDownBtn}
                          alt="dropDownBtn"
                          width={9}
                          height={6}
                        />
                      </div>
                    </div>
                    <div className="w-full relative">
                      <label
                        htmlFor="timeFormat"
                        className="block font-inter font-[700] text-[14px] leading-[21px] text-primary mb-2"
                      >
                        Time Format
                      </label>
                      <select
                        name="timeFormat"
                        id="timeFormat"
                        value={data.timeFormat || "12h (am/pm)"}
                        onChange={handleChange}
                        className="w-full appearance-none border border-solid border-lightgray rounded-[8px] py-3 px-5 font-inter font-[400] text-[14px] leading-[21px] text-primary mb-7"
                      >
                        <option value="12h (am/pm)">12h (am/pm)</option>
                        <option value="24h (am/pm)">24h (am/pm)</option>
                      </select>
                      <div className="absolute inset-y-0 right-[11px] md:right-[22.53px] flex items-center pointer-events-none">
                        <Image
                          src={dropDownBtn}
                          alt="dropDownBtn"
                          width={9}
                          height={6}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="relative w-full sm:w-[60%]">
                    <label
                      htmlFor="country"
                      className="block font-inter font-[700] text-[14px] leading-[21px] text-primary mb-2"
                    >
                      Country
                    </label>
                    <select
                      name="country"
                      id="country"
                      value={data.country || "Pakistan"}
                      onChange={handleChange}
                      className="w-full border appearance-none border-solid border-lightgray rounded-[8px] py-3 px-5 font-inter font-[400] text-[14px] leading-[21px] text-primary mb-7"
                    >
                      <option value="Pakistan">Pakistan</option>
                      <option value="United States">United States</option>
                    </select>
                    <div className="absolute inset-y-0 right-[11px] md:right-[22.53px] flex items-center pointer-events-none">
                      <Image
                        src={dropDownBtn}
                        alt="dropDownBtn"
                        width={9}
                        height={6}
                      />
                    </div>
                  </div>

                  <div className="relative w-full sm:w-[60%]">
                    <div className="flex justify-between w-full mb-2">
                      <label
                        htmlFor="timezone"
                        className="block font-inter font-[700] text-[14px] leading-[21px] text-primary"
                      >
                        Timezone
                      </label>
                      <p className="font-inter font-[500] text-[14px] leading-[21px] text-primary">
                        Current Time: {currentTime}
                      </p>
                    </div>
                    <select
                      name="timezone"
                      id="timezone"
                      value={data.timezone || "Pakistan, Maldives Time"}
                      onChange={handleChange}
                      className="w-full border appearance-none border-solid border-lightgray rounded-[8px] py-3 px-5 font-inter font-[400] text-[14px] leading-[21px] text-primary mb-7"
                    >
                      <option value="Pakistan, Maldives Time">
                        Pakistan, Maldives Time
                      </option>
                    </select>
                    <div className="absolute inset-y-0 right-[11px] md:right-[22.53px] flex items-center pointer-events-none">
                      <Image
                        src={dropDownBtn}
                        alt="dropDownBtn"
                        width={9}
                        height={6}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0">
                    <div className="space-y-3 sm:space-y-0 sm:space-x-3">
                      <Button
                        text="Save Changes"
                        onClick={saveChangesHandler}
                        disabled={!editMode}
                        className={`py-3 w-full sm:w-auto px-[14px] font-inter font-[600] text-[14px] leading-[21px] bg-quaternary text-white rounded-[40px] ${
                          !editMode && "cursor-not-allowed"
                        }`}
                      />
                      <Button
                        text="Cancel"
                        className="py-3 w-full sm:w-auto px-[14px] font-inter font-[500] text-[14px] leading-[21px] text-black rounded-[40px] border border-solid border-black"
                      />
                    </div>
                    <Button
                      text="Delete Account"
                      className="py-3 px-[14px] font-inter font-[600] text-[14px] leading-[21px] bg-danger text-white rounded-[40px]"
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
