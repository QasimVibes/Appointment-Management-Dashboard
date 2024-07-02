"use client";
import { Image, logo, availability, progressbar } from "@/app/constants/images";
import Button from "@/app/(components)/Button";
import { days, startingHours } from "./availabilityData";
import { useState } from "react";

export default function Availability() {
  const [selectTime, setSelectTime] = useState("");
  const [nextSelectOptions, setNextSelectOptions] = useState<string[]>([]);

  const handleFirstSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTime = e.target.value;
    setSelectTime(selectedTime);
    const index = startingHours.indexOf(selectedTime);
    const data = startingHours.slice(index + 1);
    setNextSelectOptions(data);
  };
  

  return (
    <div className="flex flex-col items-center space-y-[32px] mb-[48px]">
      <div className="flex items-center justify-center pt-[12px] pb-[8px]">
        <Image src={logo} alt="logo" />
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
            <div>
              <Image src={availability} alt="availability logo" />
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
                      name="time"
                      id="firstTimeSelect"
                      value={selectTime}
                      onChange={handleFirstSelectChange}
                      className="py-[13px] px-[17px]  w-[278px] rounded-[8px] border border-solid border-[#B2B2B2]"
                    >
                      <option value="" disabled>
                        Select a time
                      </option>
                      {startingHours?.map((time, index) => (
                        <option value={time} key={index}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      name="time"
                      id="secondTimeSelect"
                      className="py-[13px] w-[278px] px-[17px] rounded-[8px] border border-solid border-[#B2B2B2]"
                    >
                      <option value="" disabled>
                        Select a time
                      </option>
                      {nextSelectOptions?.map((time, index) => (
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
                  {days.map((day, index) => (
                    <div
                      className="flex flex-col px-[19.85px] py-[8px]"
                      key={index}
                    >
                      <input
                        type="checkbox"
                        id={day.data}
                        name={day.data}
                        value={day.data}
                      />
                      <label
                        htmlFor={day.data}
                        className="font-inter font-[400] text-[11.06px] leading-[18px]"
                      >
                        {day.day}
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
          <Image src={progressbar} alt="progressbar" />
          <div className="space-x-2">
            <Button
              text="Set up later"
              className="px-[17px] py-[11px] rounded-[40px] border border-solid hover:border-[grey]  text-[##1A1A1A] font-inter font-[700] text-[12.91px] leading-[22px]"
            />

            <Button
              text="Continue"
              className="px-[17px] py-[11px] rounded-[40px] border border-solid bg-[#0069ff] border-[#0069ff] text-white font-inter font-[700] text-[12.91px] leading-[22px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
