"use client";
import {
  logo,
  closer,
  scheduledEvent,
  analytics,
  adminCenter,
  exportIcon,
  filter,
} from "../../../../public";
import clock from "../../../../public/asset/clockDashboard.svg";
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

  return (
    <>
      <div className="grid grid-cols-[260px_1fr] h-[100vh]">
        <div className="w-[260px] flex flex-col justify-between border border-solid border-[#DADADA]">
          <div className="space-y-[4px]">
            <div className="flex items-center justify-between p-[20px]">
              <Image src={logo} alt="logo" className="w-[132px] h-[32px]" />
              <Image src={closer} alt="closer" className="w-[16px] h-[16px]" />
            </div>
            <div className="flex justify-center p-[10px]">
              <Link
                href={"/eventBooking"}
                className="px-[80px] py-[12px] bg-[#0069FF] rounded-[40px] font-inter font-[700] text-[14.75px] leading-[22px] text-[#FFFFFF]"
              >
                + Create
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-between flex-grow font-inter font-[700] text-[14.75] leading-[24px]">
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
                    className="mr-[20px] w-[16px] h-[16px]"
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
                    className="mr-[20px] w-[16px] h-[16px]"
                  />
                  <p>Analytics</p>
                </div>
              </div>
            </div>
            <div className="self-start py-[4px] px-[8px] space-y-[4px]">
              <div className="flex items-center py-[10px] px-[16px] ">
                <Image
                  src={clock}
                  alt="clock"
                  className="mr-[20px] w-[16px] h-[16px]"
                />
                <Link href="/availability" className="hover:text-[#0069FF]">
                  Availability
                </Link>
              </div>
              <div className="flex items-center py-[10px] px-[16px] ">
                <Image
                  src={adminCenter}
                  alt="adminCenter"
                  className="mr-[20px] w-[16px] h-[16px]"
                />
                <p className="hover:text-[#0069FF]">Admin center</p>
              </div>
            </div>
          </div>
        </div>
        {/* right side */}
        <div className="flex flex-col">
          <div className="py-[15.75px]">
            <div className="flex justify-end items-center">
              <div className="mr-[32px] flex flex-row items-center space-x-[6px] py-[4px]">
                <Button
                  className="w-[33.67px] h-[32.5px] bg-[#CCCCCC] rounded-[16px] font-inter font-[400] text-[14px] leading-[21px] text-[#1A1A1A]"
                  text={userName || "T"}
                />
                <DropDown items={menuItems} />
              </div>
            </div>
            {dashboardActiveTab === "ScheduledEvents" && (
              <div className="px-[32px]">
                <div className="space-y-[32px]">
                  <div className="py-[16px]">
                    <h1 className="font-inter font-[700] text-[25.75px] leading-[39.2px] text-[#1A1A1A]">
                      Scheduled events
                    </h1>
                  </div>
                  <div className="space-y-[24px]">
                    <div className="flex flex-row justify-between items-center">
                      <div className="relative w-[151.45px]">
                        <select className="font-inter font-[400] text-[14.5px] leading-[22.4px] block appearance-none w-full bg-white border border-solid border-gray-300 hover:border-[#1A1A1A] rounded-[8px] py-[11.79px] px-[17px] shadow-sm focus:outline-none focus:border-blue-500">
                          <option value="all">My Calendly</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-[16px] text-gray-700">
                          <svg
                            className="w-4 h-4 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 12l-5-5 1.5-1.5L10 9.5 13.5 5 15 6.5 10 12z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <p className="font-inter font-[400] text-[14.5px] leading-[22.4px] text-[#1A1A1A9C]">
                          Displaying 1 of 1 Events
                        </p>
                      </div>
                    </div>

                    <div className="border border-solid border-[#CCCCCC] rounded-[6px]">
                      <div className="flex flex-row justify-between border-b-[1px] border-solid border-[#CCCCCC]">
                        <div className="pt-[16px] px-[24px]">
                          <div className="flex font-inter font-[400] text-[15px] leading-[24px] text-[#1A1A1A9C]">
                            <div className="pr-[16px]">
                              <button
                                className={`pt-[7px] pb-[17px] ${
                                  activeTab === "Upcoming"
                                    ? "text-[#1A1A1A] border-b-[2px] border-solid border-[#0069FF]"
                                    : ""
                                }`}
                                onClick={() => setActiveTab("Upcoming")}
                              >
                                Upcoming
                              </button>
                            </div>
                            <div className="px-[16px]">
                              <button
                                className={`pt-[7px] pb-[17px] ${
                                  activeTab === "Pending"
                                    ? "text-[#1A1A1A] border-b-[2px] border-solid border-[#0069FF]"
                                    : ""
                                }`}
                                onClick={() => setActiveTab("Pending")}
                              >
                                Pending
                              </button>
                            </div>
                            <div className="px-[16px]">
                              <button
                                className={`pt-[7px] pb-[17px] ${
                                  activeTab === "Past"
                                    ? "text-[#1A1A1A] border-b-[2px] border-solid border-[#0069FF]"
                                    : ""
                                }`}
                                onClick={() => setActiveTab("Past")}
                              >
                                Past
                              </button>
                            </div>
                            <div className="pl-[16px]">
                              <button className="pt-[7px] pb-[17px]">
                                Date Range
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row justify-center items-center pr-[24px] space-x-2">
                          <div>
                            <button
                              onClick={generateICSFile}
                              className={`font-inter font-[500] text-[12.69px] leading-[20px] text-[#1A1A1A] flex border border-solid border-[#1A1A1A] rounded-[40px] px-[13px] py-[6px] ${
                                events.length > 0 ? "" : "cursor-not-allowed"
                              }`}
                              disabled={events.length === 0}
                            >
                              <Image
                                src={exportIcon}
                                alt="exportIcon"
                                className="w-[16px] h-[16px] mr-1"
                              />
                              Export
                            </button>
                          </div>
                          <div>
                            <button className="font-inter font-[500] text-[12.69px] leading-[20px] text-[#1A1A1A] flex border border-solid border-[#1A1A1A] rounded-[40px] px-[13px] py-[6px] ">
                              <Image
                                src={filter}
                                alt="filter"
                                className="w-[16px] h-[16px] mr-1"
                              />
                              Filter
                            </button>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="max-h-[313px] overflow-y-auto">
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
                            You've reached the end of the list
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
