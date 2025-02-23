import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { fetchMeeting } from "@/store/slice/scheduledEventSlice";

const useFetchAppointment = (url: string) => {
  const dispatch = useAppDispatch();
  const {
    isLoading,
    isError,
    meeting: appointment,
  } = useAppSelector((state) => state.scheduledEvent);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        await dispatch(fetchMeeting({ url })).unwrap();
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
