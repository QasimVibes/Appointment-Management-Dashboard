import { logo } from "../../../../public";
import Image from "next/image";
import SetAvailability from "@/components/setAvailability/SetAvailability";
import { useAvailability } from "./useAvailability";

export default function Availability() {
  const { days, startingHours, endingHours } = useAvailability();
  return (
    <div className="flex flex-col items-center space-y-8 mb-12">
      <div className="flex items-center justify-center pt-3 pb-2">
        <Image
          src={logo}
          alt="logo"
          width={160}
          height={38}
          className="md:w-[180px] md:h-[42px]"
        />
      </div>
      <SetAvailability
        days={days}
        startingHours={startingHours}
        endingHours={endingHours}
      />
    </div>
  );
}
