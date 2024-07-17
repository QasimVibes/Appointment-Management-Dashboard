import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { fetchMeeting } from "@/store/slice/scheduledEventSlice";
import { generateICSFile as generateICSFileAsync } from "@/store/slice/generateIcsFileSlice";

export const useFetchEvents = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const userId = session?.user?.id;

  const { isLoading, isError } = useAppSelector(
    (state) => state.scheduledEvent
  );
  const [events, setEvents] = useState<string[]>([]);
  const userName =
    session?.user?.username?.slice(0, 1).toUpperCase() ||
    session?.user?.name?.slice(0, 1).toUpperCase();

  const fetchEvents = useCallback(async () => {
    try {
      const fetchedData = await dispatch(fetchMeeting({ userId })).unwrap();
      setEvents(fetchedData?.meetings || []);
    } catch (error) {
      console.error("Error fetching meeting data:", error);
      setEvents([]);
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (userId) {
      fetchEvents();
    }
  }, [fetchEvents, userId]);

  return { userName, events, isLoading, isError };
};
export const useCategorizeEvents = (events: any[]) => {
  const [upcomingEvents, setUpcomingEvents] = useState<string[]>([]);
  const [pastEvents, setPastEvents] = useState<string[]>([]);

  useEffect(() => {
    if (events.length > 0) {
      const getEvent = (category: string) => {
        const currentDate = new Date();

        const eventsData = events
          .filter((event) => {
            const eventStartTime = new Date(
              `${event.selectedDate} ${event.selectedTime.split(" - ")[0]}`
            );
            if (category === "upcoming") {
              return eventStartTime > currentDate;
            } else if (category === "past") {
              return eventStartTime < currentDate;
            }
            return false;
          })
          .sort((eventA, eventB) => {
            const dateA = new Date(
              `${eventA.selectedDate} ${eventA.selectedTime.split(" - ")[0]}`
            );
            const dateB = new Date(
              `${eventB.selectedDate} ${eventB.selectedTime.split(" - ")[0]}`
            );

            if (dateA < dateB) return -1;
            if (dateA > dateB) return 1;

            const timeA = new Date(
              `1970-01-01 ${eventA.selectedTime.split(" - ")[0]}`
            );
            const timeB = new Date(
              `1970-01-01 ${eventB.selectedTime.split(" - ")[0]}`
            );

            if (timeA < timeB) return -1;
            if (timeA > timeB) return 1;

            return 0;
          });

        return eventsData;
      };

      setUpcomingEvents(getEvent("upcoming"));
      setPastEvents(getEvent("past"));
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
