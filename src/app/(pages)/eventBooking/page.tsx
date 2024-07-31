"use client";
import Navbar from "@/(components)/navbar/Navbar";
import { topCornerImage, clock, globe } from "../../../../public";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./customCalendar.css";
import Button from "@/(components)/button/Button";
import { useEventBooking, locations, useTimeSlots } from "./useEventBooking";
import Link from "next/link";
import Image from "next/image";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function EventBooking() {
  const { isLoading, isError, availabilityData } = useEventBooking();
  const { timeSlots, getNextTimeSlot } = useTimeSlots(
    availabilityData?.startHour,
    availabilityData?.endHour
  );

  const [selectedTime, setSelectedTime] = useState("");
  const [selectedTimezone, setSelectedTimezone] = useState("");

  useEffect(() => {
    if (locations.length > 0) {
      setSelectedTimezone(locations[0]);
    }
  }, []);

  const handleTimeSlotClick = (time: string) => {
    setSelectedTime(time);
  };

  const enabledDays: string[] | undefined = availabilityData?.days;
  const [value, onChange] = useState<Value>(new Date());
  const tileDisabled: (props: { date: Date; view: string }) => boolean = ({
    date,
  }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return (
      date < today ||
      !enabledDays?.includes(
        date.toLocaleDateString("en-US", { weekday: "long" })
      )
    );
  };

  const nextTime = getNextTimeSlot(selectedTime);
  const paramData = {
    email: availabilityData?.user?.email,
    host: availabilityData?.user?.fullname,
    hostEmail: availabilityData?.user?.email,
    startingTime: selectedTime,
    endingTime: nextTime,
    day: value?.toString().slice(0, 16),
    location: selectedTimezone,
  };

  return (
    <>
      <Navbar />
      <div className="pt-[46px] flex justify-center bg-lightwhite">
        <div className="flex flex-col items-center h-screen rounded lg:w-auto w-[90%]">
          <div className="flex flex-wrap h-[90%] w-full relative bg-white">
            <div className="w-full lg:w-[337px]">
              <div className="px-[26px] py-[34px] h-full border-[0.5px] border-solid border-lightgray space-y-[28px]">
                <div className="space-y-[6px]">
                  <p className="font-normal text-base leading-[22px] text-primary">
                    {availabilityData?.user?.fullname}
                  </p>
                  <h1 className="font-bold text-[28px] leading-[28px] text-primary">
                    30 Minute Meeting
                  </h1>
                </div>
                <div className="flex items-center space-x-2">
                  <Image src={clock} alt="clock" width={24} height={24} />
                  <p className="font-normal text-[14px] leading-[22px] text-primary">
                    30 min
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-[687px]">
              <div className="px-[19px] py-[30px] h-full border-[0.5px] border-solid border-lightgray grid grid-cols-1 lg:grid-cols-12 w-full">
                <div className="col-span-7 lg:space-y-3 space-y-4">
                  <h2 className="font-bold text-[18.75px] leading-[38px] text-primary ml-[13px]">
                    Select a Date & Time
                  </h2>
                  <div className="flex items-center justify-center lg:block">
                    <Calendar
                      onChange={onChange}
                      value={value}
                      tileDisabled={tileDisabled}
                    />
                  </div>
                  <div className="space-y-2">
                    <h2 className="font-bold text-[16px] leading-[28px] text-primary">
                      Time zone
                    </h2>
                    <div className="flex items-center space-x-2">
                      <Image src={globe} alt="globe" width={18} height={28} />
                      <select
                        name="timezone"
                        id="timezone"
                        value={selectedTimezone}
                        onChange={(e) => setSelectedTimezone(e.target.value)}
                        className="font-normal text-[14px] leading-[22px] text-primary w-full lg:w-auto"
                      >
                        {locations?.map((location) => (
                          <option key={location} value={location}>
                            {location}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-span-5 lg:space-y-8 space-y-4 lg:px-[16px]">
                  <div className="pt-[16px] lg:pt-[36px]">
                    <h2 className="font-normal text-[16px] leading-[24px] text-primary">
                      {value?.toString().slice(0, 16)}
                    </h2>
                  </div>
                  <div className="space-y-[10px] overflow-auto h-[60vh]">
                    {timeSlots?.map((time) =>
                      selectedTime !== time ? (
                        <div key={time}>
                          <Button
                            text={time}
                            className="lg:w-[90%] w-full pt-2 pb-5 border border-solid border-quaternary rounded-[6px] font-bold text-[14px] leading-[22px] text-quaternary"
                            onClick={() => handleTimeSlotClick(time)}
                          />
                        </div>
                      ) : (
                        <div
                          className="flex items-center space-x-2 lg:w-[90%]"
                          key={time}
                        >
                          <Button
                            text={selectedTime}
                            className="w-[60%] px-[18.5px] py-[14px] rounded-[6px] font-bold text-[14px] leading-[22px] text-white bg-gray-500"
                          />
                          <Link
                            href={{
                              pathname: "/scheduledEvent",
                              query: paramData,
                            }}
                            className="w-[40%] px-[18.5px] py-[14px] text-center rounded-[6px] font-bold text-[14px] leading-[22px] text-white bg-quaternary"
                          >
                            Next
                          </Link>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Image
                src={topCornerImage}
                alt="topCornerImage"
                className="absolute top-0 right-0"
                width={105}
                height={105}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
