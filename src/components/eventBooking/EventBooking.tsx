"use client";
import { clock, globe } from "../../../public";
import Calendar from "react-calendar";
import Button from "@/components/button/Button";
import Link from "next/link";
import Image from "next/image";
import TopCornerImage from "@/components/topCornerImage/TopCornerImage";
import SelectBox from "@/components/select/Select";
import { locationsProps } from "@/types/types";
import {
  useEventBooking,
  useTimeSlots,
  useEventBookingState,
} from "./useEventBooking";
import Loading from "../loading/Loading";

export function EventBooking({ locations }: locationsProps) {
  const { isLoading, isError, availabilityData } = useEventBooking();
  const { timeSlots, getNextTimeSlot } = useTimeSlots(
    availabilityData?.startHour,
    availabilityData?.endHour
  );

  const EventBookingState = useEventBookingState(
    availabilityData as any,
    locations,
    getNextTimeSlot
  );

  if (isLoading) return <Loading />;

  return (
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
                  onChange={EventBookingState?.onChange}
                  value={EventBookingState?.value}
                  tileDisabled={EventBookingState?.tileDisabled}
                />
              </div>
              <div className="space-y-2">
                <h2 className="font-bold text-[16px] leading-[28px] text-primary">
                  Time zone
                </h2>
                <div className="flex items-center space-x-2">
                  <Image src={globe} alt="globe" width={18} height={28} />
                  <SelectBox
                    options={EventBookingState?.locationsListOptions}
                    value={EventBookingState?.selectedTimezone}
                    onChange={(e) =>
                      EventBookingState?.setSelectedTimezone(e.target.value)
                    }
                    className="font-normal text-[14px] leading-[22px] text-primary w-full lg:w-auto"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-5 lg:space-y-8 space-y-4 lg:px-[16px]">
              <div className="pt-[16px] lg:pt-[36px]">
                <h2 className="font-normal text-[16px] leading-[24px] text-primary">
                  {EventBookingState?.value?.toString().slice(0, 16)}
                </h2>
              </div>
              <div className="space-y-[10px] overflow-auto h-[60vh]">
                {timeSlots?.map((time) =>
                  EventBookingState?.selectedTime !== time ? (
                    <div key={time}>
                      <Button
                        text={time}
                        className="lg:w-[90%] w-full pt-2 pb-5 border border-solid border-quaternary rounded-[6px] font-bold text-[14px] leading-[22px] text-quaternary"
                        onClick={() =>
                          EventBookingState?.handleTimeSlotClick(time)
                        }
                      />
                    </div>
                  ) : (
                    <div
                      className="flex items-center space-x-2 lg:w-[90%]"
                      key={time}
                    >
                      <Button
                        text={EventBookingState?.selectedTime}
                        className="w-[60%] px-[18.5px] py-[14px] rounded-[6px] font-bold text-[14px] leading-[22px] text-white bg-gray-500"
                      />
                      <Link
                        href={{
                          pathname: "/scheduledEvent",
                          query: EventBookingState?.paramData,
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
        <TopCornerImage />
      </div>
    </div>
  );
}
