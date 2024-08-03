"use client";
import Navbar from "@/components/navbar/Navbar";
import MeetingConfirm from "@/components/meetingConfirm/MeetingConfirm";
import useFetchAppointment from "./useScheduled";
import Loading from "@/components/loading/Loading";
import Error from "@/components/error/Error";

const Scheduled = ({ params }: { params: { url: string } }) => {
  const { url } = params;

  const { appointment, isLoading, isError } = useFetchAppointment(url);

  if (isLoading) return <Loading />;

  if (isError) return <Error />;

  return (
    <>
      {appointment && (
        <>
          <Navbar url={url} />
          <MeetingConfirm
            hostName={appointment?.hostName}
            selectedTime={appointment?.selectedTime}
            timezone={appointment?.timezone}
            selectedDate={appointment?.selectedDate}
            meetingLink={appointment?.meetingLink}
            url={url}
            userId={appointment?.userId}
          />
        </>
      )}
    </>
  );
};

export default Scheduled;
