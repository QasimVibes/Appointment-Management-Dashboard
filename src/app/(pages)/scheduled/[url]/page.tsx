"use client";
import { useEffect, useState } from "react";
import MeetingConfirm from "@/(components)/meetingConfirm/MeetingConfirm";
import Navbar from "@/(components)/navbar/Navbar";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { fetchMeeting } from "@/store/slice/scheduledEventSlice";
import toast from "react-hot-toast";

const Scheduled = ({ params }: { params: { url: string } }) => {
  const { url } = params;
  const { isLoading, isError } = useAppSelector(
    (state) => state.scheduledEvent
  );
  const dispatch = useAppDispatch();
  const [appointment, setAppointment] = useState<any>(null);
  
  const fetchAppointment = async () => {
    try {
      const fetchedData = await dispatch(fetchMeeting({ url })).unwrap();
      setAppointment(fetchedData.meeting);
    } catch (error) {
      console.error("Error fetching meeting data:", error);
    }
  };

  useEffect(() => {
    if (url) {
      fetchAppointment();
    }
  }, [url]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <Navbar url={params.url} />
      <MeetingConfirm
        hostName={appointment?.hostName}
        selectedTime={appointment?.selectedTime}
        timezone={appointment?.timezone}
        date={appointment?.selectedDate}
      />
    </>
  );
};

export default Scheduled;
