"use client";
import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import { arrowLeft, clock, briefcase, globe } from "../../../public";
import {
  useScheduledEvent,
  useSubmitScheduledEvent,
} from "./useScheduledEvent";
import Image from "next/image";
import Link from "next/link";
import { ScheduledEventProps } from "@/types/types";
import TextArea from "../textArea/TextArea";
import Label from "../label/Label";

export function ScheduledEvent({ inputDetails }: ScheduledEventProps) {
  const { details, setDetails, hostData } = useScheduledEvent();
  const { handleButtonClick } = useSubmitScheduledEvent(details, hostData);
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 w-full h-full">
        <div className="col-span-1">
          <div className="px-[24px] py-[24px] h-full border-[0.5px] border-solid border-lightgray space-y-[16px] lg:space-y-[28px]">
            <div>
              <Link
                href="/eventBooking"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-lightzinc"
              >
                <Image src={arrowLeft} alt="arrowLeft" width={24} height={24} />
              </Link>
            </div>
            <div className="space-y-[6px]">
              <p className="font-[400] text-[16px] leading-[22px] text-primary">
                {hostData?.host}
              </p>
              <h1 className="font-[700] text-[28px] leading-[28px] text-primary">
                30 Minute Meeting
              </h1>
            </div>
            <div className="space-y-[12px]">
              <div className="flex space-x-2">
                <Image src={clock} alt="clock" width={24} height={24} />
                <p className="font-[400] text-[14px] leading-[22px] text-primary">
                  30 min
                </p>
              </div>
              <div className="flex space-x-2">
                <Image src={briefcase} alt="briefcase" width={24} height={24} />
                <p className="font-[400] text-[14px] leading-[22px] text-primary">
                  {hostData?.startingTime} - {hostData?.endingTime},{" "}
                  {hostData?.day}
                </p>
              </div>
              <div className="flex space-x-2">
                <Image src={globe} alt="globe" width={24} height={24} />
                <p className="font-[400] text-[14px] leading-[22px] text-primary">
                  {hostData?.location}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <div className="px-6 py-6 h-full border border-solid border-lightgray space-y-2">
            <div>
              <h2 className="font-bold text-[20px] leading-[28px] text-primary">
                Enter Details
              </h2>
            </div>
            <div className="w-full max-w-full lg:max-w-[374px] h-full space-y-3">
              {inputDetails?.map((input: any) => (
                <Input
                  key={input.id}
                  id={input.id}
                  label={input.label}
                  type={input.type}
                  value={input.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setDetails({
                      ...details,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="w-full h-[46px] rounded-[8px] border border-solid border-darkgray px-[15px] py-[14px] text-[16px] font-normal font-Arial leading-[24px] text-primary"
                  labelClassName="text-[14.75px] font-bold font-inter leading-[22px] text-primary mb-[8px]"
                />
              ))}

              <div className="mb-[12px]">
                <Label
                  label="Please share anything that will help prepare for our meeting"
                  htmlFor="message"
                  className="text-[14.75px] font-bold font-inter leading-[22px] text-primary mb-[8px] block"
                />
                <TextArea
                  name="message"
                  id="message"
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setDetails({
                      ...details,
                      [e.target.name]: e.target.value,
                    })
                  }
                  rows={2}
                  className="w-full rounded-[8px] border border-solid border-darkgray px-[15px] py-[14px] text-[16px] font-normal font-Arial leading-[24px] text-primary"
                />
              </div>
              <p className="font-[400] text-[14px] leading-[20px] text-primary text-center lg:text-left">
                By proceeding, you confirm that you have read and agree to{" "}
                <span className="text-quaternary font-[600]">
                  Calendly&apos;s Term of Use
                </span>{" "}
                and{" "}
                <span className="text-quaternary font-[600]">
                  Privacy Policy
                </span>
                .
              </p>
              <Button
                text="Schedule Event"
                onClick={handleButtonClick}
                className="w-full lg:w-auto rounded-[28px] border border-solid px-[15px] py-[14px] text-[16px] font-normal font-Arial leading-[24px] bg-blue-700 text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
