import { AxiosInstance } from "@/utils/axiosInstance";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export const useEventsTabs = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [pastEvents, setPastEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await AxiosInstance.get("/meeting", {
          params: { userId },
        });
        if (response.data) {
          setEvents(response.data.meetings);
          setLoading(false);
        }
      } catch (error: any) {
        setLoading(false);
        setError(error);
      }
    };
    fetchEvents();
  }, [userId]);

  useEffect(() => {
    
    const currentDate = new Date();

        const upcoming = events.filter(
          (event) => new Date(event.selectedDate + " " + event.selectedTime.split(' - ')[0]) > currentDate
        );
        const past = events.filter(
          (event) => new Date(event.selectedDate + " " + event.selectedTime.split(' - ')[0]) <= currentDate
        );

    setUpcomingEvents(upcoming);
    setPastEvents(past);
  }, [events]);

  return { upcomingEvents, pastEvents, loading, error };
};
