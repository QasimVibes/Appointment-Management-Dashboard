"use client";
import Navbar from "@/components/navbar/Navbar";
import MeetingConfirm from "@/components/meetingConfirm/MeetingConfirm";
import useFetchAppointment from "./useScheduled";
import Loading from "@/components/loading/Loading";

const Scheduled = ({ params }: { params: { url: string } }) => {
  const { url } = params;

  const { appointment, isLoading, isError } = useFetchAppointment(url);

  if (isLoading) return <Loading />;

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <Navbar url={url} />
      {appointment && (
        <MeetingConfirm
          hostName={appointment.hostName}
          selectedTime={appointment.selectedTime}
          timezone={appointment.timezone}
          date={appointment.selectedDate}
        />
      )}
    </>
  );
};

export default Scheduled;
