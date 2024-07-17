import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { fetchAvailabilityData } from "@/store/slice/availabilitySlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { Time } from "@/types/types";

export const locations: string[] = [
  "Pakistan, Maldives Time (UTC+5)",
  "India Standard Time (UTC+5:30)",
  "Bangladesh Standard Time (UTC+6)",
  "Nepal Time (UTC+5:45)",
  "Sri Lanka Standard Time (UTC+5:30)",
  "Kazakhstan Time (UTC+5)",
  "Turkmenistan Time (UTC+5)",
];

export const useEventBooking = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const dispatch = useAppDispatch();
  const { isLoading, isError, availabilityData } = useAppSelector(
    (state) => state.availability
  );

  useEffect(() => {
    const fetchEventData = async () => {
      if (!userId) return;
      try {
        await dispatch(fetchAvailabilityData(userId)).unwrap();
      } catch (error: any) {
        toast.error(error || "An error occurred while fetching event data.");
        router.push("/availability");
      }
    };

    fetchEventData();
  }, [userId, dispatch]);

  return { isLoading, isError, availabilityData };
};

const convertTo24Hour = (time: string): Time => {
  const [hours, minutesPart] = time.split(/:| /);
  const minutes = parseInt(minutesPart);
  const period = time.split(" ")[1];

  let hours24 =
    period === "PM" && hours !== "12" ? parseInt(hours) + 12 : parseInt(hours);
  if (period === "AM" && hours === "12") hours24 = 0;

  return { hours: hours24, minutes };
};

const addMinutes = (time: Time, minsToAdd: number): Time => {
  const date = new Date(0, 0, 0, time.hours, time.minutes + minsToAdd);
  return { hours: date.getHours(), minutes: date.getMinutes() };
};

const formatTime = (time: Time): string => {
  let hours = time.hours % 12 || 12;
  let minutes = time.minutes.toString().padStart(2, "0");
  let period = time.hours >= 12 ? "PM" : "AM";
  return `${hours}:${minutes} ${period}`;
};

export const useTimeSlots = (
  startTime: string | undefined,
  endTime: string | undefined
) => {
  const [timeSlots, setTimeSlots] = useState<string[]>([]);

  useEffect(() => {
    if (!startTime || !endTime) return;

    const generateTimeSlots = (start: string, end: string) => {
      const slots: string[] = [];
      let startTimeConverted = convertTo24Hour(start);
      const endTimeConverted = convertTo24Hour(end);

      while (
        startTimeConverted.hours * 60 + startTimeConverted.minutes <
        endTimeConverted.hours * 60 + endTimeConverted.minutes
      ) {
        slots.push(formatTime(startTimeConverted));
        startTimeConverted = addMinutes(startTimeConverted, 30);
      }

      return slots;
    };

    const slots = generateTimeSlots(startTime, endTime);
    setTimeSlots(slots);
  }, [startTime, endTime]);

  const getNextTimeSlot = (time: string): string => {
    let time24 = convertTo24Hour(time);
    time24 = addMinutes(time24, 30);
    return formatTime(time24);
  };

  return { timeSlots, getNextTimeSlot };
};