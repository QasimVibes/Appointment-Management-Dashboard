import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { fetchMeeting } from "@/store/slice/scheduledEventSlice";
import { Event } from "@/types/types";
import { fetchAvailabilityData } from "@/store/slice/availabilitySlice";
import { useRouter } from "next/navigation";

export const useFetchEvents = () => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const userId = session?.user?.id;

  const { isLoading, isError } = useAppSelector(
    (state) => state.scheduledEvent
  );
  const [events, setEvents] = useState<Event[]>([]);
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

export const useDashboard = () => {
  const [activeTab, setActiveTab] = useState("Upcoming");
  const menuItems = [{ text: "Settings", link: "/profile" }];

  const [dashboardActiveTab, setDashboardActiveTab] = useState<
    "ScheduledEvents" | "Analytics"
  >("ScheduledEvents");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return {
    activeTab,
    setActiveTab,
    menuItems,
    dashboardActiveTab,
    setDashboardActiveTab,
    isSidebarOpen,
    setIsSidebarOpen,
  };
};

export const useNavigateHandler = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();
  const dispatch = useAppDispatch();
  let [onNavigate, setOnNavigate] = useState(false);

  const handleNavigate = useCallback(() => {
    if (userId) {
      setOnNavigate(true);
      dispatch(fetchAvailabilityData(userId))
        .unwrap()
        .then((data) => {
          const redirectTo =
            data && Object.keys(data).length > 0
              ? "/eventBooking"
              : "/availability";
          router.push(redirectTo);
        })
        .catch(() => {
          setOnNavigate(false);
          router.push("/availability");
        });
    }
  }, [userId, dispatch, router]);

  return { handleNavigate, onNavigate };
};
