import Navbar from "@/components/navbar/Navbar";
import TopCornerImage from "@/components/topCornerImage/TopCornerImage";
import { ScheduledEvent as ScheduledEventComponent } from "@/components/scheduledEvent/ScheduledEvent";
import { inputDetails } from "./useScheduledEvent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scheduled Event",
  description: "Book your next event",
  keywords: "Scheduled Event, Event, Booking",
  openGraph: {
    title: "Scheduled Event",
    description: "Book your next event",
    url: `${process.env.URL}/scheduledEvent`,
  },
};
export default function ScheduledEvent() {
  return (
    <>
      <Navbar />
      <div className="pt-[46px] flex justify-center bg-lightwhite mb-[48px]">
        <div className="relative flex flex-col items-center rounded w-[90%] lg:w-auto bg-white">
          <ScheduledEventComponent inputDetails={inputDetails} />
          <TopCornerImage />
        </div>
      </div>
    </>
  );
}
