import Image from "next/image";
import {
  checkmark,
  newWindow,
  person,
  briefcase,
  globe,
  topCornerImage,
} from "../../../public";

export default function MeetingConfirm({
  hostName,
  location,
  startTime,
  endTime,
  date,
}: {
  hostName: string | null;
  location: string | null;
  startTime: string | null;
  endTime: string | null;
  timeZone: string | null;
  date: string | null;
}) {
  return (
    <div className="pt-[66px] flex justify-center bg-[#F9F9F9]">
    <div className="relative flex flex-col items-center w-[75vw] border border-solid border-[#DADADA] h-[75vh] py-[48px]">
      <div className="flex flex-col items-center space-y-5">
        <div className="flex flex-row items-center">
          <div className="mr-[8px] flex">
            <Image
              src={checkmark}
              width={20}
              height={20}
              alt="checkmark"
            />
          </div>
          <h1 className="font-inter font-bold text-[20px] leading-[28px]">
            You are scheduled
          </h1>
        </div>
        <div className="font-inter font-[400] text-[14px] leading-[22px] text-[#1A1A1A]">
          <p>A calendar invitation has been sent to your email address</p>
        </div>
        <div className="flex">
          <button className="font-inter py-[10px] px-[24px] border border-solid border-[#1A1A1A] rounded-[40px] font-[500] text-[14px] leading-[22px] text-[#1A1A1A] flex">
            Open invitation{" "}
            <span>
              <Image src={newWindow} alt="newWindow" />
            </span>{" "}
          </button>
        </div>
        <div className="border border-solid border-[#DADADA] w-[445px] rounded-[8px] px-[16px] py-[16px] space-y-[14px]">
          <h2 className="font-inter font-[700] text-[22px] leading-[22px] text-[#1A1A1A]">
            30 Minutes Meeting
          </h2>
          <div className="flex flex-row items-center font-inter font-[400] text-[14px] leading-[22px] text-[#1A1A1A9C]">
            <Image
              src={person}
              alt="person"
              className="w-[24px] h-[24px] mr-[8px]"
            />
            {hostName}
          </div>
          <div className="flex flex-row items-center font-inter font-[400] text-[14px] leading-[22px] text-[#1A1A1A9C]">
            <Image
              src={briefcase}
              alt="briefcase"
              className="w-[24px] h-[24px] mr-[8px]"
            />
            {startTime} - {endTime}, {date}
          </div>
          <div className="flex flex-row items-center font-inter font-[400] text-[14px] leading-[22px] text-[#1A1A1A9C]">
            <Image
              src={globe}
              alt="globe"
              className="w-[24px] h-[24px] mr-[8px]"
            />
            {location}
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
  );
}
