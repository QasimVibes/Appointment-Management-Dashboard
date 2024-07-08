import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { setScheduledEvent } from "@/store/slice/scheduledEventSlice";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const useScheduledEvent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!searchParams || Array.from(searchParams.entries()).length === 0) {
      router.push("/eventBooking");
    }
  }, [searchParams, router]);

  const hostData = {
    id: searchParams.get("id"),
    email: searchParams.get("email"),
    host: searchParams.get("host"),
    startingTime: searchParams.get("startingTime"),
    endingTime: searchParams.get("endingTime"),
    day: searchParams.get("day"),
    location: searchParams.get("location"),
  };

  const [details, setDetails] = useState({
    name: "",
    email: "",
    message: "",
  });

  return { details, setDetails, hostData };
};

export const useSubmitScheduledEvent = (details: any, hostData: any) => {
  const dispatch = useAppDispatch();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { data, isLoading, isError } = useAppSelector(
    (state) => state.scheduledEvent
  );

  const handleButtonClick = useCallback(() => {
    const submitData = {
      schedulerEmail: details.email,
      schedulerName: details.name,
      description: details.message,
      selectedTime: `${hostData.startingTime} - ${hostData.endingTime}`,
      selectedDate: hostData.day,
      hostName: hostData.host,
      userId: hostData.id,
    };

    const submitEvent = async () => {
      try {
        await dispatch(setScheduledEvent(submitData));
        setIsConfirmed(true);
      } catch (error) {
        console.error(error);
      }
    };

    submitEvent();
  }, [details, hostData, dispatch]);

  return { handleButtonClick, data, isLoading, isError, isConfirmed };
};
