import Navbar from "@/components/navbar/Navbar";
import "react-calendar/dist/Calendar.css";
import "./customCalendar.css";
import { EventBooking as EventBookingComponent } from "@/components/eventBooking/EventBooking";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Booking",
  description: "Book your next event",
  keywords: "Event Booking, Event, Booking",
  openGraph: {
    title: "Event Booking",
    description: "Book your next event",
    url: `${process.env.URL}/eventBooking`,
  },
};

export default function EventBooking() {
  return (
    <>
      <Navbar />
      <div className="pt-[66px] pb-[31px] flex justify-center bg-lightwhitered">
        <EventBookingComponent />
      </div>
    </>
  );
}
