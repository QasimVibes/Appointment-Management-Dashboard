"use client";
import {
  leftArrow,
  personAdd,
  personButton,
  closer,
  opner,
  dropDownBtn,
} from "../../../public";

import Button from "@/components/button/Button";
import DropDown from "@/components/dropDown/DropDown";
import Link from "next/link";
import Image from "next/image";
import { useSidebarandSelectOptions, useUserProfile } from "./useProfile";
import SideBar from "@/components/sidebar/SideBar";
import Input from "@/components/input/Input";
import SelectBox from "@/components/select/Select";
import Label from "@/components/label/Label";
import TextArea from "@/components/textArea/TextArea";
import Loading from "../loading/Loading";
import Logo from "../logo/Logo";

export function Profile() {
  const {
    userName,
    data,
    handleChange,
    saveChangesHandler,
    currentTime,
    editMode,
    isError,
    isLoading,
  } = useUserProfile();
  const {
    isSidebarOpen,
    toggleSidebar,
    menuItems,
    aboveItems,
    belowItems,
    languageItems,
    dateFormatItems,
    timeFormatItems,
    countryItems,
    timezoneItems,
  } = useSidebarandSelectOptions();

  if (isLoading) return <Loading />;
  return (
    <>
      {/* Left Side */}
      <SideBar isSidebarOpen={isSidebarOpen}>
        <div className="flex items-center justify-between p-[20px]">
          <Logo width={132} height={32}/>
          <button className="cursor-pointer" onClick={() => toggleSidebar()}>
            <Image src={closer} alt="closer" width={16} height={16} />
          </button>
        </div>

        <div className="font-inter font-[700] text-[14.75px] leading-[24px] text-quaternary py-[4px] px-[14px]">
          <Link href="/" className="flex items-center">
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
            {aboveItems?.map((item, index) => (
              <div
                key={index}
                className={`${
                  item.text === "Profile" ? "text-quaternary" : " text-primary "
                } flex flex-row items-center space-x-[14px] font-inter font-[700] text-[15px] leading-[20px] py-[4px] px-[22px]`}
              >
                <Image src={item.src} alt={item.alt} width={20} height={20} />
                <h3>{item.text}</h3>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-[12px] self-start pb-[16px] mt-3 lg:mt-0">
          {belowItems?.map((item, index) => (
            <div
              key={index}
              className="flex flex-row items-center space-x-[14px] font-inter font-[700] text-[15px] leading-[20px] text-primary py-[4px] px-[22px]"
            >
              <Image src={item.src} alt={item.alt} width={20} height={20} />
              <h3>{item.text}</h3>
            </div>
          ))}
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
                <Input
                  type="text"
                  id="fullname"
                  value={data?.fullname}
                  onChange={handleChange}
                  className="w-full sm:w-[60%] border border-solid border-lightgray rounded-[8px] py-3 px-5 font-inter font-[400] text-[14px] leading-[21px] text-primary mb-7"
                  label="Name"
                  labelClassName="block font-inter font-[700] text-[14px] leading-[21px] text-primary mb-2"
                />
                <Label
                  label="Welcome Message"
                  htmlFor="welcomeMessage"
                  className="block font-inter font-[700] text-[14px] leading-[21px] text-primary mb-2"
                />
                <TextArea
                  rows={4}
                  id="welcomeMessage"
                  name="welcomeMessage"
                  value={data?.welcomeMessage || ""}
                  onChange={handleChange}
                  className="w-full sm:w-[60%] border border-solid border-lightgray rounded-[8px] py-3 px-5 font-inter font-[400] text-[14px] leading-[21px] text-primary mb-7"
                />

                <div className="relative w-full sm:w-[60%] ">
                  <Label
                    htmlFor="language"
                    label="Language"
                    className="block font-inter font-[700] text-[14px] leading-[21px] text-primary mb-2"
                  />
                  <SelectBox
                    id="language"
                    name="language"
                    options={languageItems}
                    value={data?.language || "English"}
                    onChange={handleChange}
                    className="w-full border appearance-none border-solid border-lightgray rounded-[8px] py-3 px-5 font-inter font-[400] text-[14px] leading-[21px] text-primary mb-7"
                    optionText="Select a language"
                  />
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
                    <Label
                      htmlFor="dateFormat"
                      label="Date Format"
                      className="block font-inter font-[700] text-[14px] leading-[21px] text-primary mb-2"
                    />
                    <SelectBox
                      name="dateFormat"
                      id="dateFormat"
                      options={dateFormatItems}
                      value={data?.dateFormat || "DD/MM/YYYY"}
                      onChange={handleChange}
                      className="w-full border appearance-none border-solid border-lightgray rounded-[8px] py-3 px-5 font-inter font-[400] text-[14px] leading-[21px] text-primary mb-7"
                      optionText="Select a date format"
                    />
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
                    <Label
                      htmlFor="timeFormat"
                      label="Time Format"
                      className="block font-inter font-[700] text-[14px] leading-[21px] text-primary mb-2"
                    />
                    <SelectBox
                      name="timeFormat"
                      id="timeFormat"
                      options={timeFormatItems}
                      value={data?.timeFormat || "12h (am/pm)"}
                      onChange={handleChange}
                      className="w-full border appearance-none border-solid border-lightgray rounded-[8px] py-3 px-5 font-inter font-[400] text-[14px] leading-[21px] text-primary mb-7"
                      optionText="Select a time format"
                    />
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
                  <Label
                    htmlFor="country"
                    label="Country"
                    className="block font-inter font-[700] text-[14px] leading-[21px] text-primary mb-2"
                  />
                  <SelectBox
                    name="country"
                    id="country"
                    options={countryItems}
                    value={data?.country || "Pakistan"}
                    onChange={handleChange}
                    className="w-full border appearance-none border-solid border-lightgray rounded-[8px] py-3 px-5 font-inter font-[400] text-[14px] leading-[21px] text-primary mb-7"
                    optionText="Select a country"
                  />
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
                    <Label
                      htmlFor="timezone"
                      label="Timezone"
                      className="block font-inter font-[700] text-[14px] leading-[21px] text-primary"
                    />
                    <p className="font-inter font-[500] text-[14px] leading-[21px] text-primary">
                      Current Time: {currentTime}
                    </p>
                  </div>
                  <SelectBox
                    name="timezone"
                    id="timezone"
                    options={timezoneItems}
                    value={data?.timezone || "Pakistan, Maldives Time"}
                    onChange={handleChange}
                    className="w-full border appearance-none border-solid border-lightgray rounded-[8px] py-3 px-5 font-inter font-[400] text-[14px] leading-[21px] text-primary mb-7"
                    optionText="Select a timezone"
                  />
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
    </>
  );
}
