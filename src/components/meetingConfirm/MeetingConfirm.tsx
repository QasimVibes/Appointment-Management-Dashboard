import Image from "next/image";
import {
  checkmark,
  newWindow,
  person,
  briefcase,
  globe,
} from "../../../public";
import { ScheduledAppointmentData } from "@/types/types";
import TopCornerImage from "../topCornerImage/TopCornerImage";
import { useInvitationHandler } from "./useMeetingConfirm";

export default function MeetingConfirm({
  hostName,
  selectedTime,
  timezone,
  selectedDate,
  meetingLink,
  url,
  userId,
}: ScheduledAppointmentData) {
  const data = [
    {
      icon: person,
      alt: "person",
      text: "hostName",
      value: hostName,
    },
    {
      icon: briefcase,
      alt: "briefcase",
      text: "selectedTime",
      value: `${selectedTime}, ${selectedDate}`,
    },
    {
      icon: globe,
      alt: "globe",
      text: "timezone",
      value: timezone,
    },
  ];

  const { invitationHandler } = useInvitationHandler(meetingLink, userId, url);

  return (
    <div className="flex flex-col items-center justify-center py-[66px]">
      <div className="w-[75%] text-center border border-solid border-lightgray shadow p-8 relative ">
        <div className="flex flex-col items-center space-y-5">
          <div className="flex flex-col  sm:flex-row items-center">
            <div className="mr-[8px] flex">
              <Image src={checkmark} width={20} height={20} alt="checkmark" />
            </div>
            <h1 className="font-inter font-bold text-[16px] sm:text-[20px] leading-[24px] sm:leading-[28px]">
              You are scheduled
            </h1>
          </div>
          <div className="font-inter font-[400] text-[12px] leading-[16px] sm:text-[14px] sm:leading-[22px] text-primary text-center px-4">
            <p>A calendar invitation has been sent to your email address</p>
          </div>
          <div className="flex ">
            <button
              onClick={invitationHandler}
              className="font-inter py-[10px] px-[24px] border border-solid border-primary rounded-[40px] font-[500] text-[12px] leading-[16px]  sm:text-[14px] sm:leading-[22px] text-primary flex items-center"
            >
              Open invitation
              <span className="ml-2">
                <Image
                  src={newWindow}
                  alt="newWindow"
                  className=""
                  width={24}
                  height={24}
                />
              </span>
            </button>
          </div>
          <div className="border border-solid border-lightgray w-full max-w-[445px] rounded-[8px] px-[16px] py-[16px] space-y-[14px]">
            <h2 className="font-inter font-[700] text-[16px] leading-[18px] sm:text-[22px] sm:leading-[22px] text-primary text-start">
              30 Minutes Meeting
            </h2>
            {data.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center font-inter font-[400] text-[14px] leading-[22px] text-secondary"
              >
                <Image
                  src={item.icon}
                  alt={item.alt}
                  className="mr-[8px]"
                  width={24}
                  height={24}
                />
                {item.value}
              </div>
            ))}
          </div>
        </div>
        <TopCornerImage />
      </div>
    </div>
  );
}
