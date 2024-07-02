"use client";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import {
  Image,
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
  dropDown,
  personAdd,
  personButton,
} from "@/app/constants/images";
import Button from "@/app/(components)/Button";
export default function Profile() {
  const handleLogout = async () => {
    try {
      await signOut({ redirect: false, callbackUrl: "/" });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };

  return (
    <>
      <div className="grid grid-cols-[260px_1fr] h-[100vh]">
        <div className="w-[260px] flex flex-col border border-solid border-[#DADADA] space-y-[16px]">
          <div className=" py-[20px] px-[20px]">
            <Image src={logo} alt="logo" className="w-[132px] h-[32px]" />
          </div>

          <div className="font-inter font-[700] text-[14.75px] leading-[24px] text-[#0069FF] py-[4px] px-[14px]">
            <button className="flex items-center">
              <Image
                src={leftArrow}
                alt="leftArrow"
                className="w-[16px] h-[16px] mr-2"
              />
              Back to home
            </button>
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
                  className="w-[20px] h-[20px]"
                />
                <h3>Profile</h3>
              </div>
              <div className="flex flex-row items-center space-x-[14px] font-inter font-[700] text-[15px] leading-[20px] text-[#1A1A1A] py-[4px] px-[22px]">
                <Image src={star} alt="star" className="w-[20px] h-[20px]" />
                <h3>Branding</h3>
              </div>
              <div className="flex flex-row items-center space-x-[14px] font-inter font-[700] text-[15px] leading-[20px] text-[#1A1A1A] py-[4px] px-[22px]">
                <Image src={link} alt="link" className="w-[20px] h-[20px]" />
                <h3>My Link</h3>
              </div>

              <div className="flex flex-row items-center space-x-[14px] font-inter font-[700] text-[15px] leading-[20px] text-[#1A1A1A] py-[4px] px-[22px]">
                <Image
                  src={preferences}
                  alt="preferences"
                  className="w-[20px] h-[20px]"
                />
                <h3>Login Preferences</h3>
              </div>
              <div className="flex flex-row items-center space-x-[14px] font-inter font-[700] text-[15px] leading-[20px] text-[#1A1A1A] py-[4px] px-[22px]">
                <Image
                  src={settingIcon}
                  alt="settingIcon"
                  className="w-[20px] h-[20px]"
                />
                <h3>Cookie Settings</h3>
              </div>
              <div className="flex flex-row items-center space-x-[14px] font-inter font-[700] text-[15px] leading-[20px] text-[#1A1A1A] py-[4px] px-[22px]">
                <Image
                  src={calender}
                  alt="calender"
                  className="w-[20px] h-[20px]"
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
                className="w-[20px] h-[20px]"
              />
              <h3>Help</h3>
            </div>
            <div className="flex flex-row items-center space-x-[14px] font-inter font-[700] text-[15px] leading-[20px] text-[#1A1A1A] py-[4px] px-[22px]">
              <Image
                src={logoutIcon}
                alt="logoutIcon"
                className="w-[20px] h-[20px]"
              />
              <button onClick={handleLogout}>Logout</button>
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
                    className="w-[18px] h-[18px] mr-2"
                  />
                  Invite user
                </button>
                <Button
                  className="w-[33.67px] h-[32.5px] bg-[#CCCCCC] rounded-[16px] font-inter font-[400] text-[14px] leading-[21px] text-[#1A1A1A]"
                  text="Q"
                />
                <Image
                  src={dropDown}
                  alt="dropDown"
                  className="w-[16px] h-[16px]"
                />
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
                  className="w-[70px] h-[70px]"
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
                <form>
                  <label
                    htmlFor="firstName"
                    className="block font-inter font-[700] text-[14px] leading-[21px] text-[#1A1A1A] mb-2"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
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
                    className="w-[60%]  border border-solid border-[#DADADA] rounded-[8px] py-3 px-5 font-inter font-[400] text-[14px] leading-[21px] text-[#1A1A1A] mb-7"
                  ></textarea>

                  <label
                    htmlFor="language"
                    className="block font-inter font-[700] text-[14px] leading-[21px] text-[#1A1A1A] mb-2"
                  >
                    Language
                  </label>
                  <select
                    defaultValue="English"
                    name="language"
                    id="language"
                    className="w-[60%]  border border-solid border-[#DADADA] rounded-[8px] py-3 px-5 font-inter font-[400] text-[14px] leading-[21px] text-[#1A1A1A] mb-7"
                  >
                    <option value="English">English</option>
                    <option value="Arabic">Arabic</option>
                    <option value="French">French</option>
                  </select>
                  <div className="flex flex-row justify-between w-[60%]">
                    <div>
                      <label
                        htmlFor="date"
                        className="block font-inter font-[700] text-[14px] leading-[21px] text-[#1A1A1A] mb-2"
                      >
                        Date Format
                      </label>
                      <select
                        name="date"
                        id="date"
                        defaultValue={"DD/MM/YYYY"}
                        className="w-full border border-solid border-[#DADADA] rounded-[8px] py-3 px-5 font-inter font-[400] text-[14px] leading-[21px] text-[#1A1A1A] mb-7"
                      >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="time"
                        className="block font-inter font-[700] text-[14px] leading-[21px] text-[#1A1A1A] mb-2"
                      >
                        Date Format
                      </label>
                      <select
                        name="time"
                        id="time"
                        defaultValue={"12h (am/pm)"}
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
                    defaultValue={"Pakistan"}
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
                    className="w-[60%]  border border-solid border-[#DADADA] rounded-[8px] py-3 px-5 font-inter font-[400] text-[14px] leading-[21px] text-[#1A1A1A] mb-7"
                  >
                    <option value="Pakistan, Maldives Time">
                      Pakistan, Maldives Time
                    </option>
                  </select>

                  <div className="flex flex-row justify-between">
                    <div className="space-x-3">
                      <Button
                        text="Save Changes"
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
