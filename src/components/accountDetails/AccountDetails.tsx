import Image from "next/image";
import Button from "../button/Button";
import Input from "../input/Input";
import Label from "../label/Label";
import TextArea from "../textArea/TextArea";
import SelectBox from "../select/Select";
import {
  languageItems,
  dateFormatItems,
  timeFormatItems,
  countryItems,
  timezoneItems,
} from "@/constants/Profile";
import { personButton, dropDownBtn } from "../../../public";
import { AccountDetailsProps } from "@/types/types";

export default function AccountDetails({
  data,
  handleChange,
  saveChangesHandler,
  currentTime,
}: AccountDetailsProps) {
  return (
    <div className="py-3 space-y-5">
      <div className="flex flex-col lg:flex-row items-center space-y-5 lg:space-y-0 lg:space-x-5">
        <Image src={personButton} alt="personButton" width={70} height={70} />
        <div className="space-y-3 text-center lg:text-left">
          <Button
            text="Upload picture"
            className="rounded-[40px] font-inter font-[400] text-[14px] leading-[21px] text-primary border border-solid border-primary py-2 px-3"
          />
          <p className="font-inter font-[400] text-[14px] leading-[21px] text-secondary ">
            JPG, GIF or PNG. MAX Size of 5MB
          </p>
        </div>
      </div>
      <div className="w-full max-w-full lg:max-w-[80%]">
        <div>
          <Input
            type="text"
            id="fullname"
            value={data?.fullname}
            onChange={handleChange}
            className="w-full lg:w-[60%] border border-solid border-lightgray rounded-[8px] py-3 px-5 font-inter font-[400] text-[14px] leading-[21px] text-primary mb-7"
            label="Name"
            labelClassName="block font-inter font-[700] text-[14px] leading-[21px] text-primary mb-2"
          />
          <Label
            label="Welcome Message"
            htmlFor="welcomeMessage"
            className="block font-inter font-[700] text-[14px] leading-[21px] text-primary mb-2"
          />
          <TextArea
            rows={4}
            id="welcomeMessage"
            name="welcomeMessage"
            value={data?.welcomeMessage || ""}
            onChange={handleChange}
            className="w-full lg:w-[60%] border border-solid border-lightgray rounded-[8px] py-3 px-5 font-inter font-[400] text-[14px] leading-[21px] text-primary mb-7"
          />

          <div className="relative w-full lg:w-[60%] ">
            <Label
              htmlFor="language"
              label="Language"
              className="block font-inter font-[700] text-[14px] leading-[21px] text-primary mb-2"
            />
            <SelectBox
              id="language"
              name="language"
              options={languageItems}
              value={data?.language || "English"}
              onChange={handleChange}
              className="w-full border appearance-none border-solid border-lightgray rounded-[8px] py-3 px-5 font-inter font-[400] text-[14px] leading-[21px] text-primary mb-7"
              optionText="Select a language"
            />
            <div className="absolute inset-y-0 right-[11px] md:right-[22.53px] flex items-center pointer-events-none">
              <Image src={dropDownBtn} alt="dropDownBtn" width={9} height={6} />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:space-x-5 w-full lg:w-[60%]">
            <div className="w-full relative">
              <Label
                htmlFor="dateFormat"
                label="Date Format"
                className="block font-inter font-[700] text-[14px] leading-[21px] text-primary mb-2"
              />
              <SelectBox
                name="dateFormat"
                id="dateFormat"
                options={dateFormatItems}
                value={data?.dateFormat || "DD/MM/YYYY"}
                onChange={handleChange}
                className="w-full border appearance-none border-solid border-lightgray rounded-[8px] py-3 px-5 font-inter font-[400] text-[14px] leading-[21px] text-primary mb-7"
                optionText="Select a date format"
              />
              <div className="absolute inset-y-0 right-[11px] md:right-[22.53px] flex items-center pointer-events-none">
                <Image
                  src={dropDownBtn}
                  alt="dropDownBtn"
                  width={9}
                  height={6}
                />
              </div>
            </div>
            <div className="w-full relative">
              <Label
                htmlFor="timeFormat"
                label="Time Format"
                className="block font-inter font-[700] text-[14px] leading-[21px] text-primary mb-2"
              />
              <SelectBox
                name="timeFormat"
                id="timeFormat"
                options={timeFormatItems}
                value={data?.timeFormat || "12h (am/pm)"}
                onChange={handleChange}
                className="w-full border appearance-none border-solid border-lightgray rounded-[8px] py-3 px-5 font-inter font-[400] text-[14px] leading-[21px] text-primary mb-7"
                optionText="Select a time format"
              />
              <div className="absolute inset-y-0 right-[11px] md:right-[22.53px] flex items-center pointer-events-none">
                <Image
                  src={dropDownBtn}
                  alt="dropDownBtn"
                  width={9}
                  height={6}
                />
              </div>
            </div>
          </div>
          <div className="relative w-full lg:w-[60%]">
            <Label
              htmlFor="country"
              label="Country"
              className="block font-inter font-[700] text-[14px] leading-[21px] text-primary mb-2"
            />
            <SelectBox
              name="country"
              id="country"
              options={countryItems}
              value={data?.country || "Pakistan"}
              onChange={handleChange}
              className="w-full border appearance-none border-solid border-lightgray rounded-[8px] py-3 px-5 font-inter font-[400] text-[14px] leading-[21px] text-primary mb-7"
              optionText="Select a country"
            />
            <div className="absolute inset-y-0 right-[11px] md:right-[22.53px] flex items-center pointer-events-none">
              <Image src={dropDownBtn} alt="dropDownBtn" width={9} height={6} />
            </div>
          </div>

          <div className="relative w-full lg:w-[60%]">
            <div className="flex justify-between w-full mb-2">
              <Label
                htmlFor="timezone"
                label="Timezone"
                className="block font-inter font-[700] text-[14px] leading-[21px] text-primary"
              />
              <p className="font-inter font-[500] text-[14px] leading-[21px] text-primary">
                Current Time: {currentTime}
              </p>
            </div>
            <SelectBox
              name="timezone"
              id="timezone"
              options={timezoneItems}
              value={data?.timezone || "Pakistan, Maldives Time"}
              onChange={handleChange}
              className="w-full border appearance-none border-solid border-lightgray rounded-[8px] py-3 px-5 font-inter font-[400] text-[14px] leading-[21px] text-primary mb-7"
              optionText="Select a timezone"
            />
            <div className="absolute inset-y-0 right-[11px] md:right-[22.53px] flex items-center pointer-events-none">
              <Image src={dropDownBtn} alt="dropDownBtn" width={9} height={6} />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between space-y-3 lg:space-y-0">
            <div className="space-y-3 lg:space-y-0 lg:space-x-3">
              <Button
                text="Save Changes"
                onClick={saveChangesHandler}
                className="py-3 w-full lg:w-auto px-[14px] font-inter font-[600] text-[14px] leading-[21px] bg-quaternary text-white rounded-[40px]"
              />
              <Button
                text="Cancel"
                className="py-3 w-full lg:w-auto px-[14px] font-inter font-[500] text-[14px] leading-[21px] text-black rounded-[40px] border border-solid border-black"
              />
            </div>
            <Button
              text="Delete Account"
              className="py-3 px-[14px] font-inter font-[600] text-[14px] leading-[21px] bg-danger text-white rounded-[40px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
