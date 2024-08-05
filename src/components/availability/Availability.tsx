"use client";
import {
  availability,
  progressbar,
  dropDownBtn,
  anocement,
} from "../../../public";
import {
  useSelectAvailability,
  useSubmitAvailability,
  useFetchAvailability,
  useSelectOptions,
} from "./useAvailability";
import Image from "next/image";
import Link from "next/link";
import Button from "../button/Button";
import SelectBox from "../select/Select";
import Input from "../input/Input";
import Loading from "../loading/Loading";
import Label from "../label/Label";
import { getAvailability } from "@/constants/Availability";
import Error from "../error/Error";

export function Availability() {
  const { days, startingHours, endingHours } = getAvailability();

  const {
    selectedDays,
    setSelectedDays,
    setStartHour,
    setEndHour,
    startHour,
    endHour,
  } = useSelectAvailability();

  const { handleSubmit } = useSubmitAvailability();

  const {
    startingHoursOptions,
    endingHoursOptions,
    handleStartHourChange,
    handleEndHourChange,
  } = useSelectOptions(startingHours, endingHours, setStartHour, setEndHour);

  const handleButtonClick = () => {
    handleSubmit(startHour, endHour, selectedDays);
  };

  const { isLoading, isError } = useFetchAvailability(
    setStartHour,
    setEndHour,
    setSelectedDays
  );

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  return (
    <>
      <div className="space-y-4 flex flex-col items-center">
        <div className="flex flex-col  md:w-[645px] border border-solid border-lightgray rounded-lg w-[90%]">
          <div className="flex flex-col md:flex-row h-full">
            <div className="py-6 px-6  md:py-8 space-y-4 m:space-y-6 flex-grow w-auto md:max-w-[457.33px]">
              <h1 className="font-inter font-bold text-lg md:text-[18.44px] leading-7 md:leading-[28px]">
                Set your availability
              </h1>
              <p className="md:w-[365px] w-auto font-inter font-normal text-sm md:text-[14.88px] leading-6 md:leading-[22.4px]">
                Let Calendly know when you&apos;re typically available to accept
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
          <div className="px-6 pt-6 md:pt-8 pb-6 border-t border-solid border-lightgray">
            <div className="space-y-5">
              <div className="space-y-2">
                <div>
                  <h2 className="font-inter font-bold text-sm md:text-[14.88px] leading-6 md:leading-[22px]">
                    Available hours
                  </h2>
                </div>
                <div className="relative flex flex-col md:flex-row gap-y-4 md:gap-x-8 items-center">
                  <div className="relative w-full md:w-auto">
                    <SelectBox
                      name="startingHours"
                      id="startingHours"
                      options={startingHoursOptions}
                      value={startHour || ""}
                      onChange={handleStartHourChange}
                      className="py-3.5 px-4 w-full md:w-[278px] rounded-lg border border-solid border-darkgray appearance-none"
                      optionText="Select a time"
                    />
                    <div className="absolute inset-y-0 right-[21px] flex items-center pointer-events-none">
                      <Image
                        src={dropDownBtn}
                        alt="dropDownBtn"
                        width={9}
                        height={6}
                      />
                    </div>
                  </div>
                  <div className="relative w-full md:w-auto">
                    <SelectBox
                      name="endingHours"
                      id="endingHours"
                      options={endingHoursOptions}
                      value={endHour || ""}
                      onChange={handleEndHourChange}
                      className="py-3.5 px-4 w-full md:w-[278px] rounded-lg border border-solid border-darkgray appearance-none"
                      optionText="Select a time"
                    />
                    <div className="absolute inset-y-0 right-[21px] flex items-center pointer-events-none">
                      <Image
                        src={dropDownBtn}
                        alt="dropDownBtn"
                        width={9}
                        height={6}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <h2 className="font-inter font-bold text-sm md:text-[14.88px] leading-6 md:leading-[22px]">
                    Available days
                  </h2>
                </div>
                <div className="flex flex-wrap md:justify-between w-full border-[1px] border-solid border-lightgray rounded-lg overflow-hidden">
                  {days?.map((day, index) => (
                    <div
                      className={`flex border-solid border-lightgray flex-col items-center px-5 py-2 w-full md:w-auto ${
                        index !== 0 ? "md:border-l-[1px]" : ""
                      }`}
                      key={index}
                    >
                      <Input
                        type="checkbox"
                        id={day}
                        value={day}
                        required
                        checked={selectedDays?.includes(day) ?? false}
                        onChange={() => {
                          if (selectedDays?.includes(day)) {
                            setSelectedDays(
                              selectedDays.filter((d) => d !== day)
                            );
                          } else {
                            setSelectedDays([...(selectedDays ?? []), day]);
                          }
                        }}
                        className="w-full"
                        labelClassName="hidden"
                      />
                      <Label
                        label={day}
                        htmlFor={day}
                        className="font-inter font-normal text-xs md:text-[11.06px] leading-[18px] w-full text-center"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:pt-9 pt-4 flex justify-center">
                <div className="flex flex-col items-center text-center md:flex-row md:gap-2 md:items-center md:justify-center">
                  <Image
                    src={anocement}
                    alt="anocement"
                    width={16}
                    height={16}
                  />
                  <p className="mt-2 md:mt-0 font-inter font-[400] text-[14.75px] leading-[24px]">
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
              href="/"
              className="px-4 py-2.5 rounded-full border border-solid border-white hover:border-darkgray text-primary font-inter font-[400] text-xs md:text-[12.91px] leading-[20px] text-center"
            >
              Set up later
            </Link>
            <Button
              text="Continue"
              onClick={handleButtonClick}
              disabled={!startHour || !endHour || !selectedDays?.length}
              className={`px-4 py-2.5 rounded-full border border-solid bg-quaternary border-quaternary text-white font-inter font-bold text-xs md:text-[12.91px] leading-[22px] ${
                !(selectedDays?.length && startHour && endHour) &&
                "cursor-not-allowed"
              }`}
            />
          </div>
        </div>
      </div>
    </>
  );
}
