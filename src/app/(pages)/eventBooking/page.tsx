"use client";
import Navbar from "@/app/(components)/Navbar";
import { topCornerImage, Image, clock, globe } from "@/app/constants/images";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./customCalendar.css";
import Button from "@/app/(components)/Button";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function EventBooking() {
  const [value, onChange] = useState<Value>(new Date());

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
                    Muhammad Qasim
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
                  <div className="">
                    <Calendar onChange={onChange} value={value} />
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
                          className="font-[400] text-[14px] leading-[22px] text-[#1A1A1A] "
                        >
                          <option value="timezone">
                            Pakistan, Maldives Time (UTC+5)
                          </option>
                          <option value="timezone">
                            Canada, New York Time (UTC-5)
                          </option>
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
                  <div className="space-y-[10px] overflow-auto h-[60%]">
                    <div>
                      <Button
                        text="9:00am"
                        className="w-[90%] pt-2 pb-5 border border-solid border-[#0069FF] rounded-[6px] font-[700] text-[14px] leading-[22px] text-[#0069FF] "
                      />
                    </div>
                    <div>
                      <Button
                        text="9:30am"
                        className="w-[90%] pt-2 pb-5 border border-solid border-[#0069FF] rounded-[6px] font-[700] text-[14px] leading-[22px] text-[#0069FF] "
                      />
                    </div>
                    <div>
                      <Button
                        text="10:00am"
                        className="w-[90%] pt-2 pb-5 border border-solid border-[#0069FF] rounded-[6px] font-[700] text-[14px] leading-[22px] text-[#0069FF] "
                      />
                    </div>
                    <div>
                      <Button
                        text="10:30am"
                        className="w-[90%] pt-2 pb-5 border border-solid border-[#0069FF] rounded-[6px] font-[700] text-[14px] leading-[22px] text-[#0069FF] "
                      />
                    </div>
                    <div>
                      <Button
                        text="11:00am"
                        className="w-[90%] pt-2 pb-5 border border-solid border-[#0069FF] rounded-[6px] font-[700] text-[14px] leading-[22px] text-[#0069FF] "
                      />
                    </div>
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
