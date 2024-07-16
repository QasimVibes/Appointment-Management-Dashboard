"use client";
import Navbar from "@/(components)/navbar/Navbar";
import Button from "@/(components)/button/Button";
import Input from "@/(components)/input/Input";
import {
  topCornerImage,
  arrowLeft,
  clock,
  briefcase,
  globe,
} from "../../../../public";
import {
  useScheduledEvent,
  useSubmitScheduledEvent,
} from "./useScheduledEvent";
import Image from "next/image";
import Link from "next/link";

export default function ScheduledEvent() {
  const { details, setDetails, hostData } = useScheduledEvent();

  const { handleButtonClick } = useSubmitScheduledEvent(details, hostData);

  return (
    <>
      <Navbar  />

      <div className="pt-[46px] flex justify-center bg-[#F9F9F9] mb-[48px]">
        <div className="relative flex flex-col items-center rounded">
          <div className="grid grid-cols-3 h-[100%]  ">
            <div className="col-span-1">
              <div className="px-[24px] py-[24px] h-full border-[0.5px] border-solid border-[#DADADA] space-y-[28px]">
                <div>
                  <Link href="/eventBooking" className="p-1 rounded-[50%] bg-[#f1eeee]">
                    <Image src={arrowLeft} alt="arrowLeft" width={24} height={24} />
                  </Link>
                </div>
                <div className="space-y-[6px]">
                  <p className="font-[400] text-[16px] leading-[22px] text-[#1A1A1A]">
                    {hostData.host}
                  </p>
                  <h1 className="font-[700] text-[28px] leading-[28px] text-[#1A1A1A]">
                    30 Minute Meeting
                  </h1>
                </div>
                <div className="space-y-[12px]">
                  <div className="flex space-x-2">
                    <Image src={clock} alt="clock"  width={24} height={24} />
                    <p className="font-[400] text-[14px] leading-[22px] text-[#1A1A1A]">
                      30 min
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Image src={briefcase} alt="briefcase"  width={24} height={24} />
                    <p className="font-[400] text-[14px] leading-[22px] text-[#1A1A1A]">
                      {hostData.startingTime} - {hostData.endingTime},{" "}
                      {hostData.day}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Image
                      src={globe}
                      alt="globe"
                      className="w-[24px] h-[24px]" 
                      width={24} height={24}
                    />
                    <p className="font-[400] text-[14px] leading-[22px] text-[#1A1A1A]">
                      {hostData.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="px-[24px] py-[24px] h-full border-[0.5px] border-solid border-[#DADADA] space-y-2">
                <div>
                  <h2 className="font-[700] text-[20px] leading-[28px] text-[#1A1A1A]">
                    Enter Detials
                  </h2>
                </div>

                <div className="w-[374px] h-full space-y-3">
                  <Input
                    name="name"
                    label="Name *"
                    type="text"
                    onChange={(e: any) =>
                      setDetails({
                        ...details,
                        [e.target.name]: e.target.value,
                      })
                    }
                    className="h-[46px] rounded-[8px] border border-solid border-[#B2B2B2] px-[15px] py-[14px] text-[16px] font-normal font-Arial leading-[24px] text-[#1A1A1A]"
                    labelClassName="text-[14.75px] font-bold font-inter leading-[22px] text-[#1A1A1A] mb-[8px]"
                  />
                  <Input
                    name="email"
                    label="Email *"
                    type="email"
                    onChange={(e: any) =>
                      setDetails({
                        ...details,
                        [e.target.name]: e.target.value,
                      })
                    }
                    className=" h-[46px] rounded-[8px] border border-solid border-[#B2B2B2] px-[15px] py-[14px] text-[16px] font-normal font-Arial leading-[24px] text-[#1A1A1A]"
                    labelClassName="text-[14.75px] font-bold font-inter leading-[22px] text-[#1A1A1A] mb-[8px]"
                  />
                  <div className="mb-[12px]">
                    <label
                      htmlFor="message"
                      className="text-[14.75px] font-bold font-inter leading-[22px] text-[#1A1A1A] mb-[8px] block"
                    >
                      Please share anything that will help prepare for our
                      meeting
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      onChange={(e: any) =>
                        setDetails({
                          ...details,
                          [e.target.name]: e.target.value,
                        })
                      }
                      rows={2}
                      className="w-full rounded-[8px] border border-solid border-[#B2B2B2] px-[15px] py-[14px] text-[16px] font-normal font-Arial leading-[24px] text-[#1A1A1A]"
                    ></textarea>
                  </div>
                  <p className="font-[400] text-[14px] leading-[20px] text-[#1A1A1A]">
                    By proceeding, you confirm that you have read and agree to{" "}
                    <span className="text-[#0069FF] font-[600]">
                      Calendly's Term of Use
                    </span>{" "}
                    and{" "}
                    <span className="text-[#0069FF] font-[600]">
                      Privacy Policy
                    </span>
                    .
                  </p>
                  <Button
                    text="Schedule Event"
                    onClick={handleButtonClick}
                    className="rounded-[28px] border border-solid px-[15px] py-[14px] text-[16px] font-normal font-Arial leading-[24px] bg-blue-700 text-white"
                  />
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
    </>
  );
}
