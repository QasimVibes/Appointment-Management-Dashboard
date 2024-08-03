import { MeetingConfirmData } from "@/types/types";
export const meetingConfirmData = ({
  person,
  hostName,
  selectedTime,
  selectedDate,
  timezone,
  briefcase,
  globe,
}: MeetingConfirmData) => {
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

  return data;
};
