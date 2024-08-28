import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { fetchMeeting } from "@/store/slice/scheduledEventSlice";
import { Event } from "@/types/types";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

export const useFetchEvents = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const userId = session?.user?.id;

  const { isLoading, isError } = useAppSelector(
    (state) => state.scheduledEvent
  );
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchEvents = useCallback(async () => {
    try {
      const fetchedData = await dispatch(fetchMeeting({ userId })).unwrap();
      setEvents(fetchedData?.meetings || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching meeting data:", error);
      setEvents([]);
      setLoading(false);
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (userId) {
      fetchEvents();
    }
  }, [fetchEvents, userId]);

  return { events, isLoading, isError, loading };
};

export const useCategorizeEvents = (events: Event[]) => {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (events?.length > 0) {
      const getEvent = (category: string) => {
        const currentDate = new Date();

        const eventsData = events
          .filter((event) => {
            const eventStartTime = new Date(
              `${event?.selectedDate} ${event?.selectedTime?.split(" - ")[0]}`
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
              `${eventA?.selectedDate} ${eventA?.selectedTime?.split(" - ")[0]}`
            );
            const dateB = new Date(
              `${eventB?.selectedDate} ${eventB?.selectedTime?.split(" - ")[0]}`
            );

            if (dateA < dateB) return -1;
            if (dateA > dateB) return 1;

            const timeA = new Date(
              `1970-01-01 ${eventA?.selectedTime?.split(" - ")[0]}`
            );
            const timeB = new Date(
              `1970-01-01 ${eventB?.selectedTime?.split(" - ")[0]}`
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
