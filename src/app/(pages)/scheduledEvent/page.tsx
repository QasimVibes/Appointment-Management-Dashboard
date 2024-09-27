import Navbar from "@/components/navbar/Navbar";
import TopCornerImage from "@/components/topCornerImage/TopCornerImage";
import { ScheduledEvent as ScheduledEventComponent } from "@/components/scheduledEvent/ScheduledEvent";
import { Metadata } from "next";
import { Suspense } from "react";

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
      <div className="pt-[46px] flex justify-center bg-lightwhitered pb-[48px] h-[100vh]">
        <div className="relative flex flex-col items-center rounded w-[90%] lg:w-auto bg-white">
          <Suspense fallback={<div>Loading Scheduled Event...</div>}>
            <ScheduledEventComponent />
          </Suspense>
          <TopCornerImage />
        </div>
      </div>
    </>
  );
}
