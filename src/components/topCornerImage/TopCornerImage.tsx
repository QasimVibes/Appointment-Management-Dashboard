import Image from "next/image";
import { topCornerImage } from "../../../public";

export default function TopCornerImage() {
  return (
    <div>
      <Image
        src={topCornerImage}
        alt="topCornerImage"
        className="absolute top-0 right-0 w-[80px] h-[80px] sm:w-[105px] sm:h-[105px]"
        width={105}
        height={105}
      />
    </div>
  );
}
