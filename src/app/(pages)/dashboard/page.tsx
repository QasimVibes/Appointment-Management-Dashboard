"use client";
import {
  logo,
  closer,
  scheduledEvent,
  analytics,
  adminCenter,
  exportIcon,
  filter,
  clockDashboard,
  plus,
  opner,
  dropDownBtn,
} from "../../../../public";
import Button from "@/(components)/button/Button";
import Link from "next/link";
import { useState } from "react";
import {
  useCategorizeEvents,
  useFetchEvents,
  useGenerateICS,
} from "./useDashboard";
import EventList from "@/(components)/eventList/EventList";
import DropDown from "@/(components)/dropDown/DropDown";
import Image from "next/image";
import Analytics from "@/(components)/chart/Chart";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Upcoming");
  const { userName, events, isLoading, isError } = useFetchEvents();
  const { upcomingEvents, pastEvents } = useCategorizeEvents(events);
  const { generateICSFile } = useGenerateICS();

  const menuItems = [{ text: "Settings", link: "/profile" }];

  const [dashboardActiveTab, setDashboardActiveTab] = useState<
    "ScheduledEvents" | "Analytics"
  >("ScheduledEvents");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className="relative h-[100vh] flex">
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:relative lg:flex flex-col justify-between border border-solid border-[#DADADA] bg-white lg:h-full h-full lg:w-[260px] lg:translate-x-0 w-[260px] z-40`}
        >
          <div className="space-y-[4px]">
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
              <Link
                href="/eventBooking"
                className="flex px-[80px] py-[12px] bg-[#0069FF] rounded-[40px] font-inter font-[700] text-[14.75px] leading-[22px] text-[#FFFFFF]"
              >
                <Image
                  src={plus}
                  alt="plus"
                  width={12}
                  height={12}
                  className="mr-[8px]"
                />
                Create
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-between flex-grow font-inter font-[700] text-[14.75px] leading-[24px]">
            <div className="self-start py-[4px] px-[8px] space-y-[4px]">
              <div className="flex items-center py-[10px] px-[16px]">
                <div
                  className={`flex items-center cursor-pointer ${
                    dashboardActiveTab === "ScheduledEvents"
                      ? "text-[#0069FF]"
                      : ""
                  }`}
                  onClick={() => setDashboardActiveTab("ScheduledEvents")}
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
              <div className="flex items-center py-[10px] px-[16px]">
                <div
                  className={`flex items-center cursor-pointer ${
                    dashboardActiveTab === "Analytics" ? "text-[#0069FF]" : ""
                  }`}
                  onClick={() => setDashboardActiveTab("Analytics")}
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
            <div className="self-start py-[4px] px-[8px] space-y-[4px]">
              <div className="flex items-center py-[10px] px-[16px]">
                <Image
                  src={clockDashboard}
                  alt="clock"
                  className="mr-[20px]"
                  height={16}
                  width={16}
                />
                <Link href="/availability" className="hover:text-[#0069FF]">
                  Availability
                </Link>
              </div>
              <div className="flex items-center py-[10px] px-[16px]">
                <Image
                  src={adminCenter}
                  alt="adminCenter"
                  className="mr-[20px]"
                  height={16}
                  width={16}
                />
                <p className="hover:text-[#0069FF]">Admin center</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side / Main Content */}
        <div className="flex-1 h-full overflow-auto">
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
                    className="w-[33.67px] h-[32.5px] bg-[#CCCCCC] rounded-[16px] font-inter font-[400] text-[14px] leading-[21px] text-[#1A1A1A]"
                    text={userName || "T"}
                  />
                  <DropDown items={menuItems} />
                </div>
              </div>
            </div>
            {dashboardActiveTab === "ScheduledEvents" && (
              <div className="px-[32px]">
                <div className="space-y-[32px]">
                  <div className="py-[16px]">
                    <h1 className="font-inter font-[700] text-[22px] leading-[24px] md:text-[25.75px] md:leading-[39.2px] text-[#1A1A1A]">
                      Scheduled events
                    </h1>
                  </div>
                  <div className="space-y-[24px]">
                    <div className="flex flex-row justify-between items-center">
                      <div className="relative w-[110px] md:w-[151.45px]">
                        <select className="font-inter font-[400] text-[12.5px] leading-[18px] md:text-[14.5px] md:leading-[22.4px] block appearance-none w-full bg-white border border-solid border-gray-300 hover:border-[#1A1A1A] rounded-[8px] py-[7.5px] px-[7.5px] md:py-[11.79px] md:px-[17px] shadow-sm focus:outline-none focus:border-blue-500 pr-[16px] md:pr-[32px]">
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
                        <p className="font-inter font-[400] text-[12.5px] leading-[18px] sm:text-[14.5px] sm:leading-[22.4px] text-[#1A1A1A9C]">
                          Displaying 1 of 1 Events
                        </p>
                      </div>
                    </div>

                    <div className="border border-solid border-[#CCCCCC] rounded-[6px]">
                      <div className="flex flex-row justify-between border-b-[1px] border-solid border-[#CCCCCC]">
                        <div className="pt-[16px] px-[12px] md:px-[24px]">
                          <div className="flex font-inter font-[400] text-[15px] leading-[24px] text-[#1A1A1A9C]">
                            <div className="pr-[8px] md:pr-[16px]">
                              <button
                                className={`pt-[7px] pb-[17px] ${
                                  activeTab === "Upcoming"
                                    ? "text-[#1A1A1A] border-b-[2px] border-solid border-[#0069FF]"
                                    : ""
                                }`}
                                onClick={() => setActiveTab("Upcoming")}
                              >
                                <span className="block sm:hidden truncate w-[5ch] overflow-hidden whitespace-nowrap text-ellipsis">
                                  Upcoming
                                </span>
                                <span className="hidden sm:inline">
                                  Upcoming
                                </span>
                              </button>
                            </div>
                            <div className="px-[8px] md:px-[16px]">
                              <button
                                className={`pt-[7px] pb-[17px] ${
                                  activeTab === "Pending"
                                    ? "text-[#1A1A1A] border-b-[2px] border-solid border-[#0069FF]"
                                    : ""
                                }`}
                                onClick={() => setActiveTab("Pending")}
                              >
                                <span className="block sm:hidden truncate w-[5ch] overflow-hidden whitespace-nowrap text-ellipsis">
                                  Pending
                                </span>
                                <span className="hidden sm:inline">
                                  Pending
                                </span>
                              </button>
                            </div>
                            <div className="px-[8px] md:px-[16px]">
                              <button
                                className={`pt-[7px] pb-[17px] ${
                                  activeTab === "Past"
                                    ? "text-[#1A1A1A] border-b-[2px] border-solid border-[#0069FF]"
                                    : ""
                                }`}
                                onClick={() => setActiveTab("Past")}
                              >
                                <span className="block sm:hidden truncate w-[5ch] overflow-hidden whitespace-nowrap text-ellipsis">
                                  Past
                                </span>
                                <span className="hidden sm:inline">Past</span>
                              </button>
                            </div>
                            <div className="pl-[16px] hidden md:block">
                              <button className="pt-[7px] pb-[17px]">
                                Date Range
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row justify-center items-center pr-[12px] md:pr-[24px] space-x-2">
                          <div>
                            <button
                              onClick={generateICSFile}
                              className={`font-inter font-[500] text-[12.69px] leading-[20px] text-[#1A1A1A] flex  border border-solid border-[#1A1A1A] rounded-[40px] px-[13px] py-[6px] ${
                                events.length > 0 ? "" : "cursor-not-allowed"
                              }`}
                              disabled={events.length === 0}
                            >
                              <Image
                                src={exportIcon}
                                alt="exportIcon"
                                className="mr-1 sm:block hidden"
                                width={16}
                                height={16}
                              />
                              Export
                            </button>
                          </div>
                          <div>
                            <button className="hidden md:flex font-inter font-[500] text-[12.69px] leading-[20px] text-[#1A1A1A]  border border-solid border-[#1A1A1A] rounded-[40px] px-[13px] py-[6px] ">
                              <Image
                                src={filter}
                                alt="filter"
                                className="mr-1"
                                width={16}
                                height={16}
                              />
                              Filter
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                        <div className="max-h-[313px] min-w-[800px] md:min-w-[1020px] overflow-y-auto ">
                          {activeTab === "Upcoming" && (
                            <EventList
                              events={upcomingEvents}
                              title="Upcoming"
                            />
                          )}
                          {activeTab === "Pending" && (
                            <EventList events={[]} title="Pending" />
                          )}
                          {activeTab === "Past" && (
                            <EventList events={pastEvents} title="Past" />
                          )}
                        </div>

                        <div className="py-[17px]">
                          <p className="font-inter font-[400] text-[14.88px] leading-[24px] text-[#1A1A1A9C] text-center">
                            You&apos;ve reached the end of the list
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {dashboardActiveTab === "Analytics" && (
              <div className="px-[32px] py-[15.75px]">
                <h1 className="font-inter font-[700] text-[25.75px] leading-[39.2px] text-[#1A1A1A]">
                  Analytics Overview
                </h1>
                <div className="">
                  <div className="">
                    <Analytics />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
