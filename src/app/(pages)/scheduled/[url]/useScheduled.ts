import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { fetchMeeting } from "@/store/slice/scheduledEventSlice";
import { ScheduledAppointmentData } from "@/types/types";

const useFetchAppointment = (url: string) => {
  const dispatch = useAppDispatch();
  const { isLoading, isError } = useAppSelector(
    (state) => state.scheduledEvent
  );
  const [appointment, setAppointment] =
    useState<ScheduledAppointmentData | null>(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const fetchedData = await dispatch(fetchMeeting({ url })).unwrap();
        setAppointment(fetchedData.meeting);
      } catch (error) {
        console.error("Error fetching meeting data:", error);
      }
    };

    if (url) {
      fetchAppointment();
    }
  }, [url, dispatch]);

  return { appointment, isLoading, isError };
};

export default useFetchAppointment;
