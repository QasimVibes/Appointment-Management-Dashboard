import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { setScheduledEvent } from "@/store/slice/scheduledEventSlice";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { validateScheduledEventData } from "@/constants/FormSchema";
import toast from "react-hot-toast";
import { useSession, signIn } from "next-auth/react";
import { ScheduledEventDetails, ScheduledEventHostData } from "@/types/types";

export const useScheduledEvent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!searchParams || Array.from(searchParams.entries()).length === 0) {
      router.push("/eventBooking");
    }
  }, [searchParams, router]);

  const hostData = {
    host: searchParams?.get("host"),
    hostEmail: searchParams?.get("hostEmail"),
    startingTime: searchParams?.get("startingTime"),
    endingTime: searchParams?.get("endingTime"),
    day: searchParams?.get("day"),
    location: searchParams?.get("location"),
  };

  const [details, setDetails] = useState<ScheduledEventDetails>({
    name: "",
    email: "",
    message: "",
  });

  return { details, setDetails, hostData };
};

export const useSubmitScheduledEvent = (
  details: ScheduledEventDetails,
  hostData: ScheduledEventHostData
) => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;
  const router = useRouter();

  const { isLoading, isError } = useAppSelector(
    (state) => state.scheduledEvent
  );

  const handleButtonClick = useCallback(async () => {
    try {
      const submitData = {
        schedulerEmail: details?.email,
        schedulerName: details?.name,
        description: details?.message,
        selectedTime: `${hostData?.startingTime} - ${hostData?.endingTime}`,
        selectedDate: hostData?.day,
        hostName: hostData?.host,
        hostEmail: hostData?.hostEmail,
        timezone: hostData?.location,
        userId: session?.user?.id,
      };

      if (!accessToken) {
        toast.error("Please log in with your Google account to proceed.");
        signIn("google");
        return;
      }

      const errors = validateScheduledEventData(submitData);

      if (Object.keys(errors).length > 0) {
        Object.values(errors).forEach((message) => toast.error(message));
        return;
      }
      const resultAction = await dispatch(setScheduledEvent(submitData));
      if (setScheduledEvent.fulfilled.match(resultAction)) {
        router.push(`/scheduled/${resultAction.payload.url}`);
      }
    } catch (error) {
      toast.error("An error occurred while saving the scheduled event.");
    }
  }, [details, hostData, accessToken, dispatch, router, session?.user?.id]);

  return { handleButtonClick, isLoading, isError };
};
