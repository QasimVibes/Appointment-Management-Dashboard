import { useAppDispatch } from "@/hooks/reduxHook";
import { generateICSFile as generateICSFileAsync } from "@/store/slice/generateIcsFileSlice";
import { useRef } from "react";
import { useSession } from "next-auth/react";

export const useGenerateICS = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const dispatch = useAppDispatch();
  const isGeneratingRef = useRef(false);

  const generateICSFile = async () => {
    if (isGeneratingRef.current) return;

    isGeneratingRef.current = true;
    try {
      await dispatch(generateICSFileAsync(userId)).unwrap();
    } catch (error: any) {
      console.error("Error generating ICS file:", error.message);
    } finally {
      isGeneratingRef.current = false;
    }
  };

  return { generateICSFile };
};
