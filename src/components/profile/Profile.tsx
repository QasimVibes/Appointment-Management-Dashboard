"use client";
import { leftArrow, closer } from "../../../public";
import Link from "next/link";
import Image from "next/image";
import { useSidebarandSelectOptions, useUserProfile } from "./useProfile";
import SideBar from "@/components/sidebar/SideBar";
import Loading from "../loading/Loading";
import Logo from "../logo/Logo";
import { aboveItems, belowItems } from "@/constants/Profile";
import Error from "../error/Error";
import LogoutBtn from "../logoutBtn/LogoutBtn";
import AccountDetails from "../accountDetails/AccountDetails";
import ProfileNavbar from "../profileNavbar/ProfileNavbar";

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
  const { isSidebarOpen, toggleSidebar } = useSidebarandSelectOptions();

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  return (
    <>
      <SideBar isSidebarOpen={isSidebarOpen}>
        <div className="flex items-center justify-between p-[20px]">
          <Logo width={132} height={32} />
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
        <div className="font-inter font-[700] text-[18px] leading-[24px] text-primary py-[12px] px-[22px]">
          <h2>Account Settings</h2>
        </div>
        <div className="flex flex-col justify-between flex-grow">
          <div className="space-y-[12px] self-start w-full">
            {aboveItems?.map((item, index) => (
              <div
                key={index}
                className={`${
                  item?.text === "Profile"
                    ? "text-quaternary"
                    : " text-primary "
                } flex flex-row items-center space-x-[14px]  font-inter font-[700] text-[15px] leading-[20px] py-[4px] px-[22px] w-full`}
              >
                <Image src={item?.src} alt={item?.alt} width={20} height={20} />
                <h3>{item?.text}</h3>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-[12px] self-start pb-[16px] mt-3 lg:mt-0 w-full">
          {belowItems?.map((item, index) =>
            item?.text === "Logout" ? (
              <LogoutBtn key={index} className="w-full focus:outline-none">
                <div className="flex flex-row items-center space-x-[14px] font-inter font-[700] text-[15px] leading-[20px] text-primary py-[4px] px-[22px] hover:text-quaternary">
                  <Image
                    src={item?.src}
                    alt={item?.alt}
                    width={20}
                    height={20}
                  />
                  <h3>{item?.text}</h3>
                </div>
              </LogoutBtn>
            ) : (
              <div
                key={index}
                className="flex flex-row items-center space-x-[14px] w-full font-inter font-[700] text-[15px] leading-[20px] text-primary py-[4px] px-[22px]"
              >
                <Image src={item?.src} alt={item?.alt} width={20} height={20} />
                <h3>{item?.text}</h3>
              </div>
            )
          )}
        </div>
      </SideBar>

      <div className="flex-1 h-full overflow-auto space-y-5 bg-lightwhitered">
        <ProfileNavbar userName={userName} toggleSidebar={toggleSidebar} />
        <div className="py-3 px-7 space-y-9">
          <div className="space-y-3">
            <h3 className="font-inter font-[600] text-[15px] leading-[20px] text-secondary">
              Accounts Details
            </h3>
            <h1 className="font-inter font-[700] text-[24px] leading-[28px] text-primary">
              Profile
            </h1>
          </div>
          <AccountDetails
            data={data}
            handleChange={handleChange}
            saveChangesHandler={saveChangesHandler}
            currentTime={currentTime}
            editMode={editMode}
          />
        </div>
      </div>
    </>
  );
}
