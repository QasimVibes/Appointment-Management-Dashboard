"use client";
import { logo, availability, progressbar } from "../../../../public";
import Button from "@/(components)/button/Button";
import {
  useAvailability,
  useSelectAvailability,
  useSubmitAvailability,
  useFetchAvailability,
} from "./useAvailability";
import Link from "next/link";
import Image from "next/image";

export default function Availability() {
  const { days, startingHours, endingHours } = useAvailability();
  const {
    selectedDays,
    setSelectedDays,
    setStartHour,
    setEndHour,
    startHour,
    endHour,
  } = useSelectAvailability();

  const { handleSubmit } = useSubmitAvailability();

  const handleButtonClick = () => {
    handleSubmit(startHour, endHour, selectedDays);
  };

  const { isLoading, isError } = useFetchAvailability(
    setStartHour,
    setEndHour,
    setSelectedDays
  );

  return (
    <div className="flex flex-col items-center space-y-[32px] mb-[48px]">
      <div className="flex items-center justify-center pt-[12px] pb-[8px]">
        <Image src={logo} alt="logo"  width={180} height={42} />
      </div>
      <div className="space-y-[16px]">
        <div className="flex flex-col w-[645px] border border-solid border-[#DADADA]">
          <div className="flex flex-row">
            <div className="px-[24px] py-[32px] space-y-[24px]">
              <h1 className="font-inter font-bold text-[18.44px] leading-[28px]">
                Set your availability
              </h1>
              <p className="font-inter font-[400] text-[14.88px] leading-[22.4px] ">
                Let Calendly know when you're typically available to accept
                meetings.
              </p>
            </div>
            <div className="h-[100%]">
              <Image src={availability} alt="availability logo" width={185} height={162} />
            </div>
          </div>
          <div className="px-[24px] pt-[32px] pb-[24px] border border-solid border-[#DADADA]  ">
            <div className="space-y-[20px]">
              <div className="space-y-[8px]">
                <div>
                  <h2 className="font-inter font-bold text-[14.88px] leading-[22px]">
                    Available hours
                  </h2>
                </div>
                <div className="flex flex-row  gap-x-[32px]">
                  <div>
                    <select
                      name="startHour"
                      id="startingHours"
                      value={startHour}
                      onChange={(e) => setStartHour(e.target.value)}
                      required
                      className="py-[13px] px-[17px]  w-[278px] rounded-[8px] border border-solid border-[#B2B2B2]"
                    >
                      <option value="">Select a time</option>
                      {startingHours.map((time, index) => (
                        <option value={time} key={index}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      name="endHour"
                      id="endingHours"
                      value={endHour}
                      onChange={(e) => setEndHour(e.target.value)}
                      required
                      className="py-[13px] w-[278px] px-[17px] rounded-[8px] border border-solid border-[#B2B2B2]"
                    >
                      <option value="">Select a time</option>
                      {endingHours?.map((time, index) => (
                        <option value={time} key={index}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="space-y-[8px]">
                <div>
                  <h2 className="font-inter font-bold text-[14.88px] leading-[22px]">
                    Available days
                  </h2>
                </div>
                <div className="flex flex-row justify-between">
                  {days?.map((day, index) => (
                    <div
                      className="flex flex-col px-[19.85px] py-[8px]"
                      key={index}
                    >
                      <input
                        type="checkbox"
                        id={day}
                        name={day}
                        value={day}
                        required
                        checked={selectedDays.includes(day)}
                        onChange={() => {
                          if (selectedDays?.includes(day)) {
                            setSelectedDays(
                              selectedDays.filter((d) => d !== day)
                            );
                          } else {
                            setSelectedDays([...selectedDays, day]);
                          }
                        }}
                      />
                      <label
                        htmlFor={day}
                        className="font-inter font-[400] text-[11.06px] leading-[18px]"
                      >
                        {day}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-[36px]">
                <div className="text-center">
                  <p>
                    Don’t worry! You’ll be able to further customize your
                    availability later on.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[645px] flex flex-row justify-between space-x-2 ">
          <Image src={progressbar} alt="progressbar" width={100} height={10} />
          <div className="space-x-2">
            <Link
              href="/dashboard"
              className="px-[17px] py-[11px] rounded-[40px] border border-solid hover:border-[grey]  text-[##1A1A1A] font-inter font-[700] text-[12.91px] leading-[22px]"
            >
              Set up later
            </Link>
            <Button
              text="Continue"
              onClick={handleButtonClick}
              className="px-[17px] py-[11px] rounded-[40px] border border-solid bg-[#0069ff] border-[#0069ff] text-white font-inter font-[700] text-[12.91px] leading-[22px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
