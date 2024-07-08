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
  const { eventData, loading, error } = useEventBooking();
  const { timeSlots, getNextTimeSlot } = useTimeSlots(
    eventData.data.startHour,
    eventData.data.endHour
  );

  const [selectedTime, setSelectedTime] = useState("");
  const [selectedTimezone, setSelectedTimezone] = useState("");

  useEffect(() => {
    if (locations.length > 0) {
      setSelectedTimezone(locations[0]);
    }
  }, [locations]);

  const handleTimeSlotClick = (time: any) => {
    setSelectedTime(time);
  };

  const enabledDays: string[] = eventData.data.days;
  const [value, onChange] = useState<Value>(new Date());
  const tileDisabled: (props: { date: Date; view: string }) => boolean = ({
    date,
  }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return (
      date < today ||
      !enabledDays.includes(
        date.toLocaleDateString("en-US", { weekday: "long" })
      )
    );
  };

  const nextTime = getNextTimeSlot(selectedTime);

  const paramData = {
    id: eventData?.data?.user?.id,
    email: eventData?.data?.user?.email,
    host: eventData?.data?.user?.fullname,
    startingTime: selectedTime,
    endingTime: nextTime,
    day: value?.toString().slice(0, 16),
    location: selectedTimezone,
  };

  return (
    <>
      <Navbar />
      <div className="pt-[46px] flex justify-center bg-[#F9F9F9]">
        <div className="relative flex flex-col items-center h-[100vh] rounded ">
          <div className="grid grid-cols-3 h-[90%]  ">
            <div className="col-span-1">
              <div className="px-[26px] py-[34px] h-full border-[0.5px] border-solid border-[#DADADA] space-y-[28px]">
                <div className="space-y-[6px]">
                  <p className="font-[400] text-[16px] leading-[22px] text-[#1A1A1A]">
                    {eventData?.data?.user?.fullname}
                  </p>
                  <h1 className="font-[700] text-[28px] leading-[28px] text-[#1A1A1A]">
                    30 Minute Meeting
                  </h1>
                </div>
                <div className="flex space-x-2">
                  <Image src={clock} alt="clock" />
                  <p className="font-[400] text-[14px] leading-[22px] text-[#1A1A1A]">
                    30 min
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="px-[24px] py-[30px] h-full border-[0.5px] border-solid border-[#DADADA]  grid grid-cols-12">
                <div className="col-span-7 space-y-3">
                  <div>
                    <h2 className="font-[700] text-[16px] leading-[28px] text-[#1A1A1A]">
                      Select a Date & Time
                    </h2>
                  </div>
                  <div>
                    <Calendar
                      onChange={onChange}
                      value={value}
                      tileDisabled={tileDisabled}
                    />
                  </div>
                  <div>
                    <div className="space-y-2">
                      <h2 className="font-[700] text-[16px] leading-[28px] text-[#1A1A1A]">
                        Time zone
                      </h2>
                      <div className="flex space-x-2">
                        <Image
                          src={globe}
                          alt="globe"
                          className="w-[18px] h-[28px]"
                        />
                        <select
                          name="timezone"
                          id="timezone"
                          value={selectedTimezone}
                          onChange={(e) => setSelectedTimezone(e.target.value)}
                          className="font-[400] text-[14px] leading-[22px] text-[#1A1A1A] "
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
                </div>

                <div className="col-span-5  space-y-8 px-[16px]">
                  <div className="pt-[36px]">
                    <h2 className="font-[400] text-[16px] leading-[24px] text-[#1A1A1A]">
                      {value?.toString().slice(0, 16)}
                    </h2>
                  </div>
                  <div className="space-y-[10px] overflow-auto h-[50%]">
                    {timeSlots?.map((time) =>
                      selectedTime !== time ? (
                        <div key={time}>
                          <Button
                            text={time}
                            className="w-[90%] pt-2 pb-5 border border-solid border-[#0069FF] rounded-[6px] font-[700] text-[14px] leading-[22px] text-[#0069FF] "
                            onClick={() => handleTimeSlotClick(time)}
                          />
                        </div>
                      ) : (
                        <div className="flex flex-row space-x-2" key={time}>
                          <Button
                            text={selectedTime}
                            className=" px-[18.5px] py-[14px] rounded-[6px] font-[700] text-[14px] leading-[22px] text-white bg-gray-500"
                          />
                          <Link
                            href={{
                              pathname: "/scheduledEvent",
                              query: paramData,
                            }}
                            className=" px-[18.5px] py-[14px] rounded-[6px] font-[700] text-[14px] leading-[22px] text-white bg-[#0069FF]"
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
          </div>
          <div>
            <Image
              src={topCornerImage}
              alt="topCornerImage"
              className="absolute top-0 right-0"
            />
          </div>
        </div>
      </div>
    </>
  );
}
