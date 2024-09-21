"use client";
import { clock, globe, troubleshoot } from "../../../public";
import Calendar from "react-calendar";
import Button from "@/components/button/Button";
import Image from "next/image";
import TopCornerImage from "@/components/topCornerImage/TopCornerImage";
import SelectBox from "@/components/select/Select";
import { locations } from "@/constants/Locations";
import {
  useEventBooking,
  useTimeSlots,
  useEventBookingState,
} from "./useEventBooking";
import { AvailabilityDataParam } from "@/types/types";
import Loading from "../loading/Loading";
import Error from "../error/Error";

export function EventBooking() {
  const { isLoading, isError, availabilityData } = useEventBooking();
  const { timeSlots, getNextTimeSlot } = useTimeSlots(
    availabilityData?.startHour,
    availabilityData?.endHour
  );
  const EventBookingState = useEventBookingState(
    availabilityData as AvailabilityDataParam,
    locations,
    getNextTimeSlot
  );

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div className="flex flex-col items-center rounded lg:w-auto w-[90%] bg-white">
      <div className="flex flex-wrap h-[90%] w-full relative bg-white">
        <div className="w-full lg:w-[369px] custom-lg:w-[337px] ">
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
          <div className="px-[19px] pt-[28px] pb-[11px] h-full border-[0.5px] border-solid border-lightgray grid grid-cols-1 lg:grid-cols-12 w-full">
            <div className="col-span-7 flex flex-col justify-between">
              <div className="lg:space-y-3 space-y-4 flex-grow">
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
                <div className="space-y-2 lg:space-y-0 lg:pt-[13px] pt-[0px]">
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
              <div className="hidden lg:flex mt-4">
                <button className="border border-solid border-primary rounded-[40px] py-[12px] px-[18px] font-inter font-[400] text-[13px] leading-[20px] text-primary flex items-center gap-2">
                  <Image
                    src={troubleshoot}
                    alt="troubleshoot"
                    width={14}
                    height={14}
                  />
                  Troubleshoot
                </button>
              </div>
            </div>
            <div className="col-span-5 lg:space-y-8 space-y-4 lg:px-[16px] ">
              <div className="pt-[16px] lg:pt-[36px]">
                <h2 className="font-normal text-[16px] leading-[24px] text-primary">
                  {EventBookingState?.value?.toString().slice(0, 16)}
                </h2>
              </div>
              <div className="space-y-[10px] overflow-auto max-h-[200px] lg:max-h-[600px] ">
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
                      <Button
                        text="Next"
                        onClick={EventBookingState?.handleClick}
                        className="w-[40%] px-[18.5px] py-[14px] text-center rounded-[6px] font-bold text-[14px] leading-[22px] text-white bg-quaternary"
                      />
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
