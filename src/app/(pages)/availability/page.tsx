import {Availability as AvailabilityComponent} from "@/components/availability/Availability";
import { useAvailability } from "./useAvailability";
import { Metadata } from "next";
import Logo from "@/components/logo/Logo";

export const metadata: Metadata = {
  title: "Availability",
  description: "Set your availability",
  keywords: "Availability, Set, Availability",
  openGraph: {
    title: "Availability",
    description: "Set your availability",
    url: `${process.env.URL}/availability`,
  },
};

export default function Availability() {
  const { days, startingHours, endingHours } = useAvailability();
  return (
    <div className="flex flex-col items-center space-y-8 mb-12">
      <div className="flex items-center justify-center pt-3 pb-2">
        <Logo width={160} height={38} className="md:w-[180px] md:h-[42px]" />
      </div>
      <AvailabilityComponent
        days={days}
        startingHours={startingHours}
        endingHours={endingHours}
      />
    </div>
  );
}
