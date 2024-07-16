import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { fetchMeeting } from "@/store/slice/scheduledEventSlice";
import { generateICSFile as generateICSFileAsync } from "@/store/slice/generateIcsFileSlice";

export const useFetchEvents = () => {
  const { data: session } = useSession();

  const dispatch = useAppDispatch();
  const userId = session?.user?.id;
  const userName = session?.user?.username
    ? session?.user?.username?.slice(0, 1).toUpperCase()
    : session?.user?.name?.slice(0, 1).toUpperCase();
  const { isLoading, isError } = useAppSelector(
    (state) => state.scheduledEvent
  );

  const [events, setEvents] = useState<string[]>([]);

  const fetchEvents = async () => {
    try {
      const fetchedData = await dispatch(fetchMeeting({ userId })).unwrap();
      setEvents(fetchedData?.meetings);
    } catch (error: any) {
      console.log("Error fetching events:", error.message);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchEvents();
    }
  }, [userId]);

  return { userName, events, isLoading, isError };
};

export const useCategorizeEvents = (events: any[]) => {
  const [upcomingEvents, setUpcomingEvents] = useState<string[]>([]);
  const [pastEvents, setPastEvents] = useState<string[]>([]);

  useEffect(() => {
    if (events.length > 0) {
      const currentDate = new Date();
      const upcoming = events.filter(
        (event) =>
          new Date(
            event.selectedDate + " " + event.selectedTime.split(" - ")[0]
          ) > currentDate
      );

      const past = events.filter(
        (event) =>
          new Date(
            event.selectedDate + " " + event.selectedTime.split(" - ")[0]
          ) <= currentDate
      );

      setUpcomingEvents(upcoming);
      setPastEvents(past);
    }
  }, [events]);

  return { upcomingEvents, pastEvents };
};

export const useGenerateICS = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const dispatch = useAppDispatch();

  const generateICSFile = async () => {
    try {
      await dispatch(generateICSFileAsync(userId)).unwrap();
    } catch (error: any) {
      console.error("Error generating ICS file:", error.message);
    }
  };

  return { generateICSFile };
};
