import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { setScheduledEvent } from "@/store/slice/scheduledEventSlice";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const useScheduledEvent = () => {
  const searchParams = useSearchParams();
  const hostData = {
    id: searchParams.get("id"),
    email: searchParams.get("email"),
    host: searchParams.get("host"),
    startingTime: searchParams.get("startingTime"),
    endingTime: searchParams.get("endingTime"),
    day: searchParams.get("day"),
    location: searchParams.get("location"),
  };

  const [detials, setDetials] = useState({
    name: "",
    email: "",
    message: "",
  });

  return { detials, setDetials, hostData };
};

export const useSubmitScheduledEvent = () => {
  const dispatch = useAppDispatch();
  const {data,isLoading,isError}=useAppSelector((state)=>state.scheduledEvent)

  const handleSubmit = useCallback(
    async (data: any) => {
      try {
        await dispatch(setScheduledEvent(data));
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch]
  );

  // Later on correct for more details Pending or Rejected or navigation
  // useEffect(() => {
  //   if (data) {
      
  //   }
  // },[data,isLoading,isError])
  return { handleSubmit };
};
