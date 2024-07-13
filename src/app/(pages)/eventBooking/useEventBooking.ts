import { AxiosInstance } from "@/utils/axiosInstance";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

// leater on adding into types folder
type Time = {
  hours: number;
  minutes: number;
};

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
  const [eventData, setEventData] = useState({
    data: {
      startHour: "",
      endHour: "",
      days: [],
      user: {
        fullname: "",
        email: "",
        id: "",
      },
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        // get request to slice
        const response = await AxiosInstance.get("/availability");
        if (response.data) {
          const filteredData = response.data.availability?.find(
            (data: any) => data.userId === userId
          );
          if (filteredData) {
            setEventData({
              data: {
                startHour: filteredData.startHour,
                endHour: filteredData.endHour,
                days: filteredData.days,
                user: {
                  fullname: filteredData.user.fullname,
                  email: filteredData.user.email,
                  id: filteredData.user.id,
                },
              },
            });
          }
        }
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchEventData();
    } else {
      setLoading(false);
    }
  }, [userId]);

  return { eventData, loading, error };
};

export const useTimeSlots = (startTime: string, endTime: string) => {
  const [timeSlots, setTimeSlots] = useState<string[]>([]);

  useEffect(() => {
    const slots = generateTimeSlots(startTime, endTime);
    setTimeSlots(slots);
  }, [startTime, endTime]);

  const generateTimeSlots = (startTime: string, endTime: string) => {
    const timeSlots: string[] = [];
    let start = convertTo24Hour(startTime);
    const end = convertTo24Hour(endTime);

    while (start.hours * 60 + start.minutes < end.hours * 60 + end.minutes) {
      timeSlots.push(formatTime(start));
      start = addMinutes(start, 30);
    }

    return timeSlots;
  };

  const convertTo24Hour = (time: string): Time => {
    const [hours, minutesPart] = time.split(/:| /);
    const minutes = parseInt(minutesPart);
    const period = time.split(" ")[1];

    let hours24 = period === 'PM' && hours !== '12' ? parseInt(hours) + 12 : parseInt(hours);
    if (period === 'AM' && hours === '12') hours24 = 0;

    return { hours: hours24, minutes };
  };
  
  const addMinutes = (time: Time, minsToAdd: number): Time => {
    const date = new Date(0, 0, 0, time.hours, time.minutes + minsToAdd);
    return { hours: date.getHours(), minutes: date.getMinutes() };
  };

  const formatTime = (time: Time): string => {
    let hours = time.hours % 12 || 12;
    let minutes = time.minutes.toString().padStart(2, "0");
    let period = time.hours >= 12 ? 'PM' : 'AM';
    return `${hours}:${minutes} ${period}`;
  };

  const getNextTimeSlot = (time: string): string => {
    let time24 = convertTo24Hour(time);
    time24 = addMinutes(time24, 30);
    return formatTime(time24);
  };

  return { timeSlots, getNextTimeSlot };
};
