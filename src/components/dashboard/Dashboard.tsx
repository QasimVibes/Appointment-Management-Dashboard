"use client";
import {
  logo,
  closer,
  scheduledEvent,
  analytics,
  adminCenter,
  clockDashboard,
  plus,
  opner,
  dropDownBtn,
} from "../../../public";
import Button from "@/components/button/Button";
import Link from "next/link";
import { useDashboard, useNavigateHandler } from "./useDashboard";
import DropDown from "@/components/dropDown/DropDown";
import Image from "next/image";
import Analytics from "@/components/chart/Chart";
import SideBar from "@/components/sidebar/SideBar";
import Events from "../events/Events";

export default function Dashboard() {
  const {
    activeTab,
    setActiveTab,
    dashboardActiveTab,
    setDashboardActiveTab,
    isSidebarOpen,
    setIsSidebarOpen,
    menuItems,
    userName,
  } = useDashboard();

  const { handleNavigate, onNavigate } = useNavigateHandler();

  return (
    <>
      <SideBar isSidebarOpen={isSidebarOpen}>
        <div className="space-y-[4px] bg-white">
          <div className="flex items-center justify-between p-[20px]">
            <Image src={logo} alt="logo" width={132} height={32} />
            <button
              className="cursor-pointer"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Image src={closer} alt="closer" width={16} height={16} />
            </button>
          </div>
          <div className="flex justify-center p-[10px]">
            <Button
              onClick={handleNavigate}
              className="flex items-center px-[80px] py-[12px] bg-quaternary rounded-[40px] font-inter font-[700] text-[14.75px] leading-[22px] text-white"
            >
              <Image
                src={plus}
                alt="plus"
                width={12}
                height={12}
                className={`mr-[8px] ${onNavigate ? "animate-spin" : ""} `}
              />
              Create
            </Button>
          </div>
        </div>
        <div className="pb-[16px] flex flex-col justify-between flex-grow font-inter font-[700] text-[14.75px] leading-[24px]">
          <div className="self-start py-[4px] px-[8px] space-y-[4px] w-full">
            <div
              className={`flex items-center py-[10px] px-[16px] w-full rounded-[8px] cursor-pointer hover:text-quaternary ${
                dashboardActiveTab === "ScheduledEvents" ? "bg-bluewhite" : ""
              }`}
              onClick={() => setDashboardActiveTab("ScheduledEvents")}
            >
              <div
                className={`flex items-center   ${
                  dashboardActiveTab === "ScheduledEvents"
                    ? "text-quaternary"
                    : ""
                }`}
              >
                <Image
                  src={scheduledEvent}
                  alt="scheduledEvent"
                  className="mr-[20px]"
                  width={16}
                  height={16}
                />
                <p>Scheduled events</p>
              </div>
            </div>
            <div
              className={`flex items-center py-[10px] px-[16px] cursor-pointer hover:text-quaternary ${
                dashboardActiveTab === "Analytics" ? "bg-bluewhite" : ""
              }`}
              onClick={() => setDashboardActiveTab("Analytics")}
            >
              <div
                className={`flex items-center   ${
                  dashboardActiveTab === "Analytics" ? "text-quaternary" : ""
                }`}
              >
                <Image
                  src={analytics}
                  alt="analytics"
                  className="mr-[20px]"
                  width={16}
                  height={16}
                />
                <p>Analytics</p>
              </div>
            </div>
          </div>
          <div className="self-start py-[4px] px-[8px] space-y-[4px] w-full">
            <Link href="/availability">
              <div className="flex items-center py-[10px] px-[16px] w-full cursor-pointer hover:text-quaternary">
                <Image
                  src={clockDashboard}
                  alt="clock"
                  className="mr-[20px]"
                  height={16}
                  width={16}
                />

                <p>Availability</p>
              </div>
            </Link>
            <div className="flex items-center py-[10px] px-[16px] w-full hover:text-quaternary cursor-pointer">
              <Image
                src={adminCenter}
                alt="adminCenter"
                className="mr-[20px]"
                height={16}
                width={16}
              />
              <p>Admin center</p>
            </div>
          </div>
        </div>
      </SideBar>

      <div className="flex-1 h-full overflow-auto bg-lightwhitered">
        <div className="py-[15.75px]">
          <div className="flex flex-row justify-between lg:justify-end items-center py-[4px]">
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

            <div className="flex items-center mr-[32px]">
              <div className="flex flex-row items-center space-x-[6px]">
                <Button
                  className="w-[33.67px] h-[32.5px] bg-tertiary rounded-[16px] font-inter font-[400] text-[14px] leading-[21px] text-primary"
                  text={userName || "T"}
                />
                <DropDown items={menuItems} />
              </div>
            </div>
          </div>
          {dashboardActiveTab === "ScheduledEvents" && (
            <div className="lg:px-[32px] px-[16px] ">
              <div className="space-y-[32px]">
                <div className="py-[16px]">
                  <h1 className="font-inter font-[700] text-[22px] leading-[24px] md:text-[25.75px] md:leading-[39.2px] text-primary">
                    Scheduled events
                  </h1>
                </div>
                <div className="space-y-[24px]">
                  <div className="flex flex-row justify-between items-center">
                    <div className="relative w-[110px] md:w-[151.45px]">
                      <select className="font-inter font-[400] text-[12.5px] leading-[18px] md:text-[14.5px] md:leading-[22.4px] block appearance-none w-full bg-white border border-solid border-lightgray hover:border-primary rounded-[8px] py-[7.5px] px-[7.5px] md:py-[11.79px] md:px-[17px] shadow-sm focus:outline-none focus:border-quaternary pr-[16px] md:pr-[32px]">
                        <option value="all">My Calendly</option>
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
                    <div>
                      <p className="font-inter font-[400] text-[12.5px] leading-[18px] sm:text-[14.5px] sm:leading-[22.4px] text-secondary">
                        Displaying 1 of 1 Events
                      </p>
                    </div>
                  </div>
                  <Events activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
              </div>
            </div>
          )}
          {dashboardActiveTab === "Analytics" && (
            <div className="px-[32px] py-[15.75px]">
              <h1 className="font-inter font-[700] text-[25.75px] leading-[39.2px] text-primary">
                Analytics Overview
              </h1>
              <div>
                <div>
                  <Analytics />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
