import Navbar from "@/app/(components)/Navbar";
import {
  checkmark,
  Image,
  newWindow,
  person,
  briefcase,
  globe,
  topCornerImage,
} from "@/app/constants/images";

export default function Scheduled() {
  return (
    <>
      <Navbar />
      <div className="pt-[66px] flex justify-center bg-[#F9F9F9]">
        <div className="relative flex flex-col items-center w-[75vw] border border-solid border-[#DADADA] h-[75vh] py-[48px]">
          <div className="flex flex-col  items-center space-y-5">
            <div className="flex flex-row items-center">
              <div className="mr-[8px] flex  ">
                <Image
                  src={checkmark}
                  alt="checkmark"
                  className="w-[25px] h-[25px]"
                />
              </div>
              <h1 className="font-inter font-bold text-[20px] leading-[28px]">
                You are scheduled
              </h1>
            </div>
            <div className="font-inter font-[400] text-[14px] leading-[22px] text-[#1A1A1A]">
              <p>A calender invitation has been sent to your email address</p>
            </div>
            <div className="flex">
              <button className="font-inter py-[10px] px-[24px] border border-solid border-[#1A1A1A] rounded-[40px] font-[500] text-[14px] leading-[22px] text-[#1A1A1A] flex">
                Open invitation{" "}
                <span>
                  <Image src={newWindow} alt="newWindow" />
                </span>{" "}
              </button>
            </div>
            <div className="border border-solid border-[#DADADA] w-[445px] rounded-[8px] px-[16px] py-[16px] space-y-[14px] ">
              <h2 className="font-inter font-[700] text-[22px] leading-[22px] text-[#1A1A1A] ">
                30 Minutes Meeting
              </h2>
              <div className="flex flex-row items-center font-inter font-[400] text-[14px] leading-[22px] text-[#1A1A1A9C] ">
                <Image
                  src={person}
                  alt="person"
                  className="w-[24px] h-[24px] mr-[8px]"
                />
                Muhammad Qasim
              </div>
              <div className="flex flex-row items-center font-inter font-[400] text-[14px] leading-[22px] text-[#1A1A1A9C] ">
                <Image
                  src={briefcase}
                  alt="briefcase"
                  className="w-[24px] h-[24px] mr-[8px]"
                />
                10:00 AM - 11:00 AM, Monday, November 10, 2022
              </div>
              <div className="flex flex-row items-center font-inter font-[400] text-[14px] leading-[22px] text-[#1A1A1A9C] ">
                <Image
                  src={globe}
                  alt="globe"
                  className="w-[24px] h-[24px] mr-[8px]"
                />
                Pakistan, Maldives Time
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
