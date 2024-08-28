import React from "react";
import Button from "../button/Button";
import GenerateICS from "../generateICS/GenerateICS";
import EventList from "../eventList/EventList";
import { useCategorizeEvents, useFetchEvents } from "./useEvents";
import Image from "next/image";
import { filter } from "../../../public";
import { tabs } from "@/constants/EventTabs";
import Error from "../error/Error";
import Loader from "../loader/Loader";
import { EventsProps } from "@/types/types";

export default function Events({ activeTab, setActiveTab }: EventsProps) {
  const { events, isLoading, isError, loading } = useFetchEvents();
  const { upcomingEvents, pastEvents } = useCategorizeEvents(events);

  if (isError) return <Error />;

  return (
    <div className="border border-solid border-tertiary rounded-[6px] bg-white">
      <div className="flex flex-row justify-between border-b-[1px] border-solid border-tertiary">
        <div className="pt-[16px] px-[12px] md:px-[24px]">
          <div className="flex font-inter font-[400] text-[15px] leading-[24px] text-secondary">
            {tabs?.map((tab) => (
              <div
                key={tab?.value}
                className={`cursor-pointer px-[8px] ${
                  tab?.value === "Upcoming"
                    ? "md:pr-[16px] md:px-0"
                    : "md:px-[16px]"
                }`}
              >
                <Button
                  className={`pt-[7px] pb-[17px] ${
                    activeTab === tab?.value
                      ? "text-primary border-b-[2px] border-solid border-quaternary"
                      : ""
                  }`}
                  onClick={() => setActiveTab(tab?.value)}
                >
                  <span className="block sm:hidden truncate w-[5ch] overflow-hidden whitespace-nowrap text-ellipsis">
                    {tab?.label}
                  </span>
                  <span className="hidden sm:inline">{tab?.label}</span>
                </Button>
              </div>
            ))}
            <div className="pl-[16px] hidden md:block">
              <Button className="pt-[7px] pb-[17px]">Date Range</Button>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center pr-[12px] md:pr-[24px] space-x-2">
          <GenerateICS events={events} />
          <div>
            <Button className="hidden md:flex font-inter font-[500] text-[12.69px] leading-[20px] text-primary  border border-solid border-primary rounded-[40px] px-[13px] py-[6px] ">
              <Image
                src={filter}
                alt="filter"
                className="mr-1"
                width={16}
                height={16}
              />
              Filter
            </Button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="max-h-[313px] min-w-[800px] md:min-w-[1020px] overflow-y-auto">
          {isLoading || loading ? (
            <div className="py-[17px] flex justify-center items-center border-b-[1px]">
              <Loader className="w-6 h-6" />
            </div>
          ) : (
            <>
              {activeTab === "Upcoming" && (
                <EventList events={upcomingEvents} title="Upcoming" />
              )}
              {activeTab === "Pending" && (
                <EventList events={[]} title="Pending" />
              )}
              {activeTab === "Past" && (
                <EventList events={pastEvents} title="Past" />
              )}
            </>
          )}
        </div>

        <div className="py-[17px]">
          <p className="font-inter font-[400] text-[14.88px] leading-[24px] text-secondary text-center">
            You&apos;ve reached the end of the list
          </p>
        </div>
      </div>
    </div>
  );
}
