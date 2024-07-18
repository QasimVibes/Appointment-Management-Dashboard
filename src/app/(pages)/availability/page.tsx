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
    <div className="flex flex-col items-center space-y-8 mb-12">
      <div className="flex items-center justify-center pt-3 pb-2">
        <Image
          src={logo}
          alt="logo"
          width={160}
          height={38}
          className="md:w-[180px] md:h-[42px]"
        />
      </div>
      <div className="space-y-4 flex flex-col items-center">
        <div className="flex flex-col  md:w-[645px] border border-solid border-[#DADADA] w-[90%]">
          <div className="flex flex-col md:flex-row h-full">
            <div className="py-6 px-6  md:py-8 space-y-4 m:space-y-6 flex-grow">
              <h1 className="font-inter font-bold text-lg md:text-[18.44px] leading-7 md:leading-[28px]">
                Set your availability
              </h1>
              <p className="font-inter font-normal text-sm md:text-[14.88px] leading-6 md:leading-[22.4px]">
                Let Calendly know when you're typically available to accept
                meetings.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src={availability}
                alt="availability logo"
                className="object-cover"
                width={185}
                height={162}
              />
            </div>
          </div>
          <div className="px-6 pt-6 mb:pt-8 pb-6 border-t border-solid border-[#DADADA]">
            <div className="space-y-5">
              <div className="space-y-2">
                <div>
                  <h2 className="font-inter font-bold text-sm md:text-[14.88px] leading-6 md:leading-[22px]">
                    Available hours
                  </h2>
                </div>
                <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-8">
                  <div>
                    <select
                      name="startHour"
                      id="startingHours"
                      value={startHour}
                      onChange={(e) => setStartHour(e.target.value)}
                      required
                      className="py-3.5 px-4 w-full md:w-[278px] rounded-lg border border-solid border-[#B2B2B2]"
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
                      className="py-3.5 px-4 w-full md:w-[278px] rounded-lg border border-solid border-[#B2B2B2]"
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
              <div className="space-y-2">
                <div>
                  <h2 className="font-inter font-bold text-sm md:text-[14.88px] leading-6 md:leading-[22px]">
                    Available days
                  </h2>
                </div>
                <div className="flex flex-wrap md:justify-between  w-full">
                  {days?.map((day, index) => (
                    <div
                      className="flex flex-col items-center px-5 py-2 w-full md:w-auto"
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
                        className="w-full"
                      />
                      <label
                        htmlFor={day}
                        className="font-inter font-normal text-xs md:text-[11.06px] leading-[18px] w-full text-center"
                      >
                        {day}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:pt-9">
                <div className="text-center">
                  <p>
                    Don&apos;t worry! You&apos;ll be able to further customize
                    your availability later on.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[90%] md:w-[645px] flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-2">
          <Image
            src={progressbar}
            alt="progressbar"
            width={100}
            height={10}
            className="hidden md:block"
          />
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <Link
              href="/dashboard"
              className="px-4 py-2.5 rounded-full border border-solid hover:border-[grey] text-[#1A1A1A] font-inter font-bold text-xs md:text-[12.91px] leading-[22px] text-center"
            >
              Set up later
            </Link>
            <Button
              text="Continue"
              onClick={handleButtonClick}
              disabled={!startHour || !endHour || !selectedDays.length}
              className={`px-4 py-2.5 rounded-full border border-solid bg-[#0069ff] border-[#0069ff] text-white font-inter font-bold text-xs md:text-[12.91px] leading-[22px]
               ${
                 !(selectedDays.length && startHour && endHour) &&
                 "cursor-not-allowed"
               }
              `}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
