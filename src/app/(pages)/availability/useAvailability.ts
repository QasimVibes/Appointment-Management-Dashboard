import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import {
  getAvailability,
  setAvailability,
} from "@/store/slice/availabilitySlice";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

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
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
  ];
  return { days, startingHours };
};

export const useSelectAvailability = () => {
  const { startingHours } = useAvailability();
  const [selectTime, setSelectTime] = useState("");
  const [nextSelectTime, setNextSelectTime] = useState("");
  const [nextSelectOptions, setNextSelectOptions] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const handleFirstSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTime = e.target.value;
    setSelectTime(selectedTime);
    const index = startingHours.indexOf(selectedTime);
    const hours = startingHours.slice(index + 1);
    setNextSelectOptions(hours);
  };

  return {
    selectTime,
    nextSelectTime,
    nextSelectOptions,
    selectedDays,
    setSelectedDays,
    setNextSelectTime,
    handleFirstSelectChange,
    setSelectTime,
  };
};



export const useSubmitAvailability = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  const handleSubmit = useCallback(
    async (
      selectTime: string,
      nextSelectTime: string,
      selectedDays: string[]
    ) => {
      try {
        if (session?.user?.id) {
          await dispatch(
            setAvailability({
              startHour: selectTime,
              endHour: nextSelectTime,
              days: selectedDays,
              userId: session?.user.id,
            })
          ).unwrap();
        }
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch, session]
  );

  return { handleSubmit };
};

export const useFetchAvailability = (
  setSelectTime: (value: string) => void,
  nextSelectOptions: (value: string) => void,
  setSelectedDays: (value: string[]) => void
) => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const { data, isLoading, isError } = useAppSelector(
    (state) => state.availability
  );
 
  useEffect(() => {
    if (session?.user?.id) {
      dispatch(getAvailability(session.user.id));
    }
  }, [dispatch, session]);
  
  useEffect(() => {
    if (data) {
      setSelectTime(data.availability?.startHour);
      nextSelectOptions(data.availability?.endHour);
      setSelectedDays(data.availability?.days);
    }
  }, [data, setSelectTime, nextSelectOptions, setSelectedDays]);

  return { data, isLoading, isError };
};
