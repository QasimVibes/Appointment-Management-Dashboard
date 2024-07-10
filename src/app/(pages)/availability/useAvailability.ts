import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { setAvailability } from "@/store/slice/availabilitySlice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AxiosInstance } from "@/utils/axiosInstance";
import { availabilitySchema } from "@/types/ValidationSchema/FormSchema";
import { z } from "zod";

export const useAvailability = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const startingHours = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
  ];
  const endingHours = ["02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"];
  return { days, startingHours, endingHours };
};

export const useSelectAvailability = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");

  return {
    selectedDays,
    setSelectedDays,
    setStartHour,
    setEndHour,
    startHour,
    endHour,
  };
};

export const useSubmitAvailability = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = useCallback(
    async (startHour: string, endHour: string, selectedDays: string[]) => {
      try {
        availabilitySchema.parse({ startHour, endHour, selectedDays });
        if (session?.user?.id) {
          await dispatch(
            setAvailability({
              startHour: startHour,
              endHour: endHour,
              days: selectedDays,
              userId: session?.user.id,
            })
          ).unwrap();
          router.push("/eventBooking");
        }
      } catch (error) {
        if (error instanceof z.ZodError) {
          error.errors.forEach((err) => {
            toast.error(err.message);
          });
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      }
    },
    [dispatch, session]
  );

  return { handleSubmit };
};

export const useFetchAvailability = (
  setStartHour: (value: string) => void,
  setEndHour: (value: string) => void,
  setSelectedDays: (value: string[]) => void
) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    if (userId) {
      const fetchAvailabilityData = async () => {
        try {
          const response = await AxiosInstance.get(`/availability`);
          if (response.data) {
            const filteredData = response.data.availability?.find(
              (data: any) => data.userId === userId
            );
            if (filteredData) {
              setStartHour(filteredData.startHour);
              setEndHour(filteredData.endHour);
              setSelectedDays(filteredData.days);
              toast.success("Availability set successfully");
            }
          }
        } catch (error: any) {
          setIsError(error);
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };

      if (userId) {
        fetchAvailabilityData();
      } else {
        setIsLoading(false);
      }
    }
  }, [userId, setStartHour, setEndHour, setSelectedDays]);

  return { isLoading, isError };
};
