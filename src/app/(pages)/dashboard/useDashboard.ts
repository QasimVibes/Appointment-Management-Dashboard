import { AxiosInstance } from "@/utils/axiosInstance";
import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import axios from "axios";

export const useFetchEvents = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const userName = session?.user?.username?.slice(0, 1).toUpperCase();

  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return { userName, events, loading, error };
};

export const useCategorizeEvents = (events: any[]) => {
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [pastEvents, setPastEvents] = useState<any[]>([]);

  useEffect(() => {
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
  }, [events]);

  return { upcomingEvents, pastEvents };
};

export const useGenerateICS = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const generateICSFile = useCallback(async () => {
    try {
      const response = await AxiosInstance.post(
        "/generateICS",
        {
          userId,
        },
        {
          responseType: "blob",
        }
      );

      if (response.status === 200) {
        toast.success("ICS file generated successfully");
        const blob = new Blob([response.data], { type: "text/calendar" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "appointment.ics";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        toast.error("Failed to generate ICS file");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(`Failed to generate ICS file: ${error.response.status}`);
        }
      } else {
        toast.error("Failed to generate ICS file");
      }
    }
  }, [userId]);

  return { generateICSFile };
};
